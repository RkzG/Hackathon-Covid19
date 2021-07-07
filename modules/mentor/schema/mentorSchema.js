const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose, { convert: false });

const uuid = joi.string().guid();
const date = joi.string().isoDate();

const mentorSchema = joi.object().keys({
  mentorId: uuid,
  name:  joi.string().required(),
  email: joi.string().required(),
  address: joi.string().required(),
  phone: joi.string().required(),
  biodata: joi.string().max(255).required(),
  education: joi.string().required(),
  certification: joi.string().required(),
  rating: joi.number().min(1).max(5).required(),
  memberDate: date.optional(),
  fee: joi.number().required()
});

const schema = new mongoose.Schema(joigoose.convert(mentorSchema));
const Mentor = mongoose.model('mentor', schema);

module.exports = Mentor;
