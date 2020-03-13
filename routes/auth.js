const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// login
router.post('/auth/login', auth.login);

// logout
router.get('/auth/logout', auth.logout);

module.exports = router;
