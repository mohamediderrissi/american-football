#!/usr/bin/env node

const express = require('express');
const path = require('path');
const cors = require('cors');
const scoresRouter = require('./routes/scoresRouter');
const logger = require('./middleware/logger');

const app = express();

const parseArgs = () => {
  let [maxTeamX, maxTeamY] = [0, 0];
  let [value_1, value_2] = [
    parseInt(process.argv[2]),
    parseInt(process.argv[3]),
  ];
  if (isNaN(value_1) || isNaN(value_2)) {
    console.error('Please Insert a correct numbers for max values !');
    process.exit(1);
  }
  [maxTeamX, maxTeamY] = [value_1, value_2];
  app.set('maxX', maxTeamX);
  app.set('maxY', maxTeamY);
};

parseArgs();

// listen for requests:
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);

// routes
app.use('/scores', scoresRouter);

// 404 page
app.use((req, res) => {
  res.sendStatus(404);
});
