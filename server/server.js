const express = require('express');
const cors = require('cors');
const port = 8000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const controller = require('./controller/controller');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use(session({
    name: "intern",
    key: "intern",
    secret: 'abc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    controller.automaticDeleteRequest();
});

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", function (socket) {
    console.log('socket io server connected')
    controller.socketController(socket, io);

});

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/router'));


