const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scores');

router
  .route('/')
  .get((req, res, next) => {
    res.send('<h1>Scores</h1>');
  })
  .post((req, res, next) => {
    const result = scoresController.calculate(req);

    if(!result) {
      return res.sendStatus(400);
    }

    if (result.error) {
      res.status(400).send(result.error);
      return;
    }
    res.json(result);
  });

module.exports = router;
