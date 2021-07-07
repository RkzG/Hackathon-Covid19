const mongoose = require('mongoose');

const config = require('../../helpers/config/config');
const logger = require('../../helpers/utils/logger');

const mongoDb = () => {
  const ctx = 'mongodb-db';
  const args = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(config.get('/mongo'), args)
    .then(() => logger.log(ctx, 'Connected to database', 'Database'))
    .catch((err) => err ? logger.error(ctx, 'Database error', err) : {});
};

module.exports = mongoDb;
