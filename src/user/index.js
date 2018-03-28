const { Router } = require('express');
const controller = require('./user.controller');
const token = require('./../authentication/token');

const router = new Router();

router.get('/', [token.isAuthenticated], controller.index);
router.get('/:id', [token.isAuthenticated], controller.getUser);
router.post('/',  [token.isAuthenticated], controller.create);
router.delete('/:id',  [token.isAuthenticated], controller.delete);
router.post('/login', controller.login);
module.exports = router;