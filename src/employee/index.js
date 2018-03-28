const { Router } = require('express');
const controller = require('./employee.controller');
const token = require('./../authentication/token');
const router = new Router();

router.get('/', [token.isAuthenticated],  controller.index);

router.post('/', [token.isAuthenticated],  controller.create);

router.put('/:id', [token.isAuthenticated], controller.update);

router.get('/:id', [token.isAuthenticated], controller.getEmployee);

router.delete('/:id', [token.isAuthenticated], controller.delete);

module.exports = router;