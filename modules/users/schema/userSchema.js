const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose, { convert: false });

const { RELIGION, RESIDENCE, MARITAL_STATUS: MARRIAGE } = require('../../../helpers/utils/commons');

const uuid = joi.string().guid();
const date = joi.string().isoDate();

const registerSchema = joi.object().keys({
  userId: uuid,
  name:  joi.string().max(255).required(),
  email: joi.string().regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/).required(),
  password: joi.string().min(6).required(),
  nik: joi.string().min(16).max(16).required(),
  religion: joi.string().valid(RELIGION.ISLAM, RELIGION.KRISTEN, RELIGION.KATOLIK, RELIGION.HINDU, RELIGION.BUDDHA, RELIGION.KONGHUCU).required(),
  marriageStatus: joi.string().valid(MARRIAGE.SINGLE, MARRIAGE.MARRIED, MARRIAGE.DIVORCED, MARRIAGE.DEATH_DIVORCED).required(),
  residence: joi.string().valid(RESIDENCE.HOME, RESIDENCE.KOST, RESIDENCE.APARTMENT, RESIDENCE.RENT).required(),
  phone: joi.string().regex(/^[0-9+]{10,20}$/).required(),
  address: joi.string().required(),
  addressNumber: joi.string().required(),
  rtRw: joi.string().required(),
  province: joi.string().required(),
  district: joi.string().required(),
  subDistrict: joi.string().required(),
  village: joi.string().required(),
  otp: joi.string().min(6).max(6),
  memberDate: date.optional(),
  isFirstTime: joi.bool().optional(),
  isVerified: joi.bool().optional().default(false),
  isTwoFactor: joi.bool().optional().default(false),
});


const schema = new mongoose.Schema(joigoose.convert(registerSchema));
const User = mongoose.model('user', schema);

module.exports = User;
