const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const fs = require('fs');

const cors = require('cors');
const path = require('path');

const ejs = require('ejs');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: [],
    }
});

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));
app.engine('html', require('ejs').renderFile);

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const gameRoutes = require('./routes/game.routes');

app.get('/', (req, res)=>{
    return res.render('index.html');
})

app.use('/game', gameRoutes);

let gameToken = '';

io.on('connection', (socket) => {

    socket.on('join-game', (userId, gameToken)=>{
        console.log('user id: ', userId);
        console.log('game token: ', gameToken);
        socket.join(gameToken);
        socket.broadcast.emit('user-connected', userId);
    })

    socket.on('create-game', (userId, gameToken)=>{
        socket.in(gameToken).emit('testing');
    })

});

server.listen(4000, () => {
    console.log('listening on *:4000');
})
