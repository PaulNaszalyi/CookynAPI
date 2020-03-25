const express = require('express');
const router = express.Router();
const recette = require('../controllers/recette.controller');

/* GET users listing. */

router.get('/recettes', recette.findAll);

router.get('/recette/:id', recette.findOne);

router.get('/findRecettes/:name', recette.find);

router.post('/recette', recette.create);

router.post('/photo', recette.uploadPhoto);

module.exports = router;
