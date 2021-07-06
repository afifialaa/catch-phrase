const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');

/**
 * Current live room
 * @type
 */
let liveRooms = new Set();

/**
 * Create token controller
 * @param {*} req 
 * @param {*} res 
 * @returns json
 */
function createToken(req, res){
    let roomToken = uuidv4();
    liveRooms.add(roomToken)
    return res.status(200).json({roomToken: roomToken});
}

/**
 * Render room.html
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function createRoom(req, res){
    return res.render('room.html');
}

/**
 * Join room controller
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function joinRoom(req, res){
    if(isRoomLive(req.params.token)){
        return res.render('room_join.html');
    }else{
        return res.status(404).json({msg: 'No live room'});
    }
}

/**
 * Validate room is live
 * @function 
 * @param {string} roomToken
*/
function isRoomLive(roomToken) {
    if (liveRooms.has(roomToken)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    createToken,
    createRoom,
    joinRoom
}
