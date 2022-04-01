const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const {Server} = require('socket.io');
const http = require('http');

require("./config/mongoose.config");


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`)
    });

    socket.on("send_message", (data) =>{
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
});

require('./routes/user.routes')(app)

server.listen(4000, ()=>{
    console.log('this is also running')
})
app.listen(8000, () => console.log(`Listening on port: 8000`));