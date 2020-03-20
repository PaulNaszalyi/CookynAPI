const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const recetteRouter = require('./recette');

router.use(userRouter);
router.use(authRouter);
router.use(recetteRouter);

router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

module.exports = router;
