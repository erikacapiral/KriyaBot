const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tsekbot'
});


connection.connect(function (err) {
    if (err) {
        console.log(err.message)
    } else {
        console.log('db connect');
    }
});


module.exports = connection;