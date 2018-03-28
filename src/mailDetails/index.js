const { Router } = require('express');
const controller = require('./mailDetails.controller');
const token = require('./../authentication/token');

const router = new Router();

router.get('/', [token.isAuthenticated], controller.index);

router.post('/', [token.isAuthenticated], controller.create);

module.exports = router;