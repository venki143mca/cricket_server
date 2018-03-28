const { Router } = require('express');
const controller = require('./player.controller');
const token = require('./../authentication/token');
const router = new Router();

router.get('/', [token.isAuthenticated],  controller.index);

module.exports = router;