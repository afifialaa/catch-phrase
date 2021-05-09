const gameController = require('../controllers/game.controller');
const router = require('express').Router();

router.get('/createGame', gameController.createToken);
router.post('/join', gameController.joinGame);
router.get('/:token', gameController.createGame);

module.exports = router;