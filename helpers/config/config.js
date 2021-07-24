require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  secret: process.env.SECRET_TOKEN,
  mongoDbName: process.env.MONGODB_NAME,
  twPhone: process.env.TWILIO_PHONE,
  twSid: process.env.TWILIO_ACCOUNT_SID,
  twAuth: process.env.TWILIO_AUTH_TOKEN,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  basicAuth: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);

