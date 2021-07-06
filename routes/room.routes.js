const roomController = require('../controllers/room.controller');
const router = require('express').Router();

router.get('/createRoom', roomController.createToken);
router.get('/join/:token', roomController.joinRoom);
router.get('/:token', roomController.createRoom);

module.exports = router;