const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const authRouter = require('./auth');

router.use(userRouter);
router.use(authRouter);

router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

module.exports = router;
