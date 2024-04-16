const con = require('../connection/database');
const bcrypt = require('bcrypt');


//global variable to access the logged in user in socket.io functions
let loggedInUser = null;

exports.login = (req, res) => {

    const { email, password } = req.body;
    const sql = 'SELECT * FROM employee WHERE email = ?';

    con.query(sql, [email], async (err, results) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (results.length > 0) {

            const validPassword = await bcrypt.compare(password, results[0].password);
            if (validPassword) {
                req.session.user = results[0];
                //store in global varible
                loggedInUser = results[0];
                const user = req.session.user
                console.log(req.session);
                return res.json({ Login: true, user: user });
            }
            else {
                return res.json({ Error: "Incorrect Password" });
            }
        } else {
            return res.json({ Error: "No email existed" })
        }
    });

}


exports.authentication = (req, res) => {

    if (req.session.user) {
        return res.json({ valid: true, user: req.session.user })
    } else {
        return res.json({ valid: false })
    }
}


exports.logout = (req, res) => {
    if (req.session.user) {
        res.clearCookie("intern");
        req.session.destroy();
        loggedInUser = null;
        return res.json({ Status: "Successful Logout" });
    }
}


//controller to fetch type of concerns
exports.fetchConcerns = (req, res) => {
    const sql = "SELECT * FROM  concern_category"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching Types of Concerns in server" });
        return res.json(result);
    });
}

//controller to add request agent
//need to delete
// exports.requestAgent = (req, res) => {
//     const { category, description } = req.body;
//     const id = req.session.user.emp_id;

//     const sql = "INSERT INTO request_agent(category_id, emp_id, concern_desc) VALUES (?,?,?)";

//     con.query(sql, [category, id, description], (err) => {
//         if (err) return res.json({ Error: "Error Inserting Data in server" });
//         return res.json({ Status: "Successful Request for Agent" });
//     });

// }


//controller to check if a user  has ongoing request
//it will return the row count
exports.checkOngoingRequest = (req, res) => {
    const id = req.session.user.emp_id;
    const sql = "SELECT * FROM request_agent where emp_id = ? AND (status = ? OR status = ?)";
    con.query(sql, [id, 0, 1], (err, result) => {

        if (err) return res.json({ Error: "Error Fetching Data in server" });

        return res.json({ result: result.length });
    });
}

//controller to fetch the list of agent request of the user
// exports.fetchUserConcerns = (req, res) => {
//     const id = req.session.user.emp_id;
//     const sql = "SELECT * FROM request_agent where emp_id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Error: "Error Fetching Data in server" });
//         return res.json({ result });
//     });
// }

//modified April 03 for list of request_agent of users
// exports.fetchUserConcerns = (req, res) => {
//     const id = req.session.user.emp_id;
//     const sql = "SELECT request_agent.*, concern_category.category_name FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id where request_agent.emp_id = ? AND NOT request_agent.arc_client= ? AND NOT request_agent.del_client= ? ORDER BY request_agent.created_at DESC";
//     con.query(sql, [id, 1, 1], (err, result) => {
//         if (err) return res.json({ Error: "Error fetching Request Agent in server" });
//         return res.json(result);
//     });
// }



//need to modify
exports.deleteRequestAgent = (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE request_agent SET del_client = ? WHERE request_id =?";
    con.query(sql, [1, id], (err) => {
        if (err) return res.json({ Error: "Error Deleting Data in server" });
        return res.json({ Status: "Request Agent Delete Successfuly in Client Side" });
    });
};


exports.archiveRequestAgent = (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE request_agent SET arc_client = ? WHERE request_id =?";
    con.query(sql, [1, id], (err) => {
        if (err) return res.json({ Error: "Error Updating Data in server" });
        return res.json({ Status: "Request Agent Archived Successfuly" });
    });
};



//modified April 03 for archive requests
exports.fetchArchivedUserConcerns = (req, res) => {
    const id = req.session.user.emp_id;
    const sql = "SELECT request_agent.*, concern_category.category_name FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id where request_agent.emp_id = ? AND request_agent.arc_client= ? AND NOT del_client = ? ORDER BY request_agent.created_at DESC";
    con.query(sql, [id, 1, 1], (err, result) => {
        if (err) return res.json({ Error: "Error fetching Archived Request Agent in server" });
        return res.json(result);
    });
}




exports.unarchiveRequestAgent = (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE request_agent SET arc_client = ? WHERE request_id =?";
    con.query(sql, [0, id], (err) => {
        if (err) return res.json({ Error: "Error Updating Data in server" });
        return res.json({ Status: "Request Agent Unarchived Successfuly" });
    });
};

//automatic deletion of request_agent when both agent and client deleted their records
exports.automaticDeleteRequest = () => {
    const sql = "DELETE FROM request_agent WHERE del_client = ? AND del_agent = ?";
    con.query(sql, [1, 1], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result && result.affectedRows > 0) {
                console.log('Successful Deletion of Request Agent');
            }
        }
    });
}

exports.socketController = (socket, io) => {
    let room;
    let userid;

    socket.on("request_agent", (data) => {
        const userId = loggedInUser.emp_id;
        const { category, description } = data.values;
        let concern = '';

        // First query to insert into request_agent table
        const insertSql = "INSERT INTO request_agent(category_id, emp_id, concern_desc) VALUES (?,?,?)";

        con.query(insertSql, [category, userId, description], (err, res) => {
            if (err) {
                console.log(err);
                socket.emit("request_agent_status", { Status: 400 });
            } else {
                const requestId = res.insertId;

                // Second query to fetch concern category
                const selectSql = "SELECT * FROM concern_category WHERE category_id = ?";
                con.query(selectSql, [category], (err, result) => {
                    if (err) {
                        console.log('Error fetching data in server');
                    } else {
                        // concern = result[0].category_name + ": " + description;

                        // userid = userId;
                        // room = requestId;

                        // socket.join(requestId);

                        // io.to(requestId).emit("chat", {
                        //     username: "Concern",
                        //     text: concern,
                        //     room: requestId
                        // });
                        // console.log(`Emitted "chat" event to room ${requestId}`);


                        // const fetch = "SELECT request_agent.*, concern_category.category_name FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id where request_agent.emp_id = ? AND NOT request_agent.arc_client= ? AND NOT request_agent.del_client= ? ORDER BY request_agent.created_at DESC";
                        // con.query(fetch, [userId, 1, 1], (err, result) => {

                        const fetch = "SELECT request_agent.*, concern_category.category_name, COUNT(messages.message_id) AS unread_count FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id LEFT JOIN messages ON request_agent.request_id = messages.request_id AND messages.is_read = ? AND NOT messages.emp_id = ? WHERE request_agent.emp_id = ? AND NOT request_agent.arc_client = ? AND NOT request_agent.del_client = ? GROUP BY request_agent.request_id ORDER BY request_agent.created_at DESC";
                        con.query(fetch, [0, userId, userId, 1, 1], (err, result) => {

                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result);
                                io.emit('fetchedUserConcerns', result);
                            }

                        });


                    }

                    socket.emit("request_agent_status", { Status: 302 });
                });
            }
        });
    });


    socket.on("fetchUserConcerns", () => {

        const userId = loggedInUser.emp_id;
        // const fetch = "SELECT request_agent.*, concern_category.category_name FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id where request_agent.emp_id = ? AND NOT request_agent.arc_client= ? AND NOT request_agent.del_client= ? ORDER BY request_agent.created_at DESC";
        // con.query(fetch, [userId, 1, 1], (err, result) => {
        const fetch = "SELECT request_agent.*, concern_category.category_name, COUNT(messages.message_id) AS unread_count FROM request_agent INNER JOIN concern_category ON request_agent.category_id = concern_category.category_id LEFT JOIN messages ON request_agent.request_id = messages.request_id AND messages.is_read = ? AND NOT messages.emp_id = ? WHERE request_agent.emp_id = ? AND NOT request_agent.arc_client = ? AND NOT request_agent.del_client = ? GROUP BY request_agent.request_id ORDER BY request_agent.created_at DESC";
        con.query(fetch, [0, userId, userId, 1, 1], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                io.emit('fetchedUserConcerns', result);
            }

        });


    })







};



// socket.on("chat", (message) => {
//     console.log("Received message from.....:", message.username);
//     console.log("Message content......:", message.text);
//     console.log("Room.....:", room);
//     console.log("User ID.......:", userid);
// });

