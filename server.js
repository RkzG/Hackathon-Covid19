const express = require('express');
const corsMiddleware = require('cors');

const app = express();

const mainAPI = require('./routes/index');
const logger = require('./helpers/utils/logger');
const mongoDb = require('./database/mongodb/db');
const config = require('./helpers/config/config');
const { CODE: httpCode } = require('./helpers/utils/commons');

const PORT = config.get('/port');

app.use(express.json());
app.use(corsMiddleware());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainAPI);
app.get('/', (req, res) => res.status(httpCode.SUCCESS).json({
  success: true,
  data: '',
  message: 'This server is running properly.',
  code: httpCode.SUCCESS
}));

app.listen(PORT, async (err) => {
  const ctx = 'server-listen';

  mongoDb();
  await err ? logger.error(ctx, 'Error initialize', err) :
    logger.log(ctx, `Connected to ${PORT}`, 'Server');
});
