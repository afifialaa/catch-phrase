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

const roomRoutes = require('./routes/room.routes');

app.get('/', (req, res) => {
    return res.render('index.html');
})

app.use('/room', roomRoutes);

/**
 * Socket connection event
 * @listens
 */
io.on('connection', (socket) => {

    /**
     * Join game event handle
     * @listens
    */
    socket.on('join-room', (userId, roomToken) => {
        socket.join(roomToken);
        socket.broadcast.emit('user-connected', userId);
        // io.in(roomToken).emit('user-connected', userId);
    })

    /**
     * Create room event handle
     * @listens
     */
    socket.on('create-room', (roomToken) => {
        console.log('creating room event - token ', roomToken);
        socket.join(roomToken);
    })
});

/**
 * validate room is live
 * @function 
 * @param {string} roomToken
*/
function isRoomLive(roomToken) {
    if (app.locals.liveRooms.has(roomToken)) {
        return true;
    } else {
        return false;
    }
}

module.exports = server;
