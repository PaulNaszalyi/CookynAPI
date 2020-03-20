const express = require('express');
const router = express.Router();
const recette = require('../controllers/recette.controller');

/* GET users listing. */

router.get('/recettes', recette.findAll);

router.post('/recette', recette.create);

router.post('/photo', recette.uploadPhoto);

module.exports = router;
