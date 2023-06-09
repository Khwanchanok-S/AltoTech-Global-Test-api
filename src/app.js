require('dotenv').config();

const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { sequelize } = require('./models');
sequelize.sync({ alter: true });

const app = express();
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: 'too many requests, please try again later' },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.yellowBright.bold(`server running on port: ${port}`)),
);
