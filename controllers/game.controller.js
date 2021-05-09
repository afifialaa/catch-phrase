const { v4: uuidv4 } = require('uuid');

function createToken(req, res){
    return res.json({gameToken: uuidv4()});
}

function createGame(req, res){
    return res.render('game.html');
}

function joinGame(req, res){
    return res.json({gameToken: uuidv4()});
}

module.exports = {
    createToken,
    createGame,
    joinGame
}
