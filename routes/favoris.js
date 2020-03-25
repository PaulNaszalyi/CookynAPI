const express = require('express');
const router = express.Router();
const user = require('../controllers/favoris.controller');

/* GET users listing. */

router.get('/favoris', user.findAll);

router.post('/favoris', user.create);

router.delete('/favoris', user.delete);

router.post('/getfavoris', user.find);

module.exports = router;
