'use strict';

const Router = require('express').Router
const router = new Router();
const controller = require('./products.controller')
const cache = require('../../middleware/memory-cache')
router.get('/', cache(10), controller.index);
router.get('/:code', cache(10), controller.getByCode)
module.exports = router;