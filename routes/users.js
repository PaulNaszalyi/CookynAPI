const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

/* GET users listing. */

router.get('/users', user.findAll);

router.post('/user', user.create);

module.exports = router;
