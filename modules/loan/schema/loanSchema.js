const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose, { convert: false });

const { LOAN_STATUS } = require('../../../helpers/utils/commons');

const loanSchema = joi.object().keys({
  userId: joi.string().guid(),
  loanId: joi.string().guid(),
  loanAmount: joi.string().required(),
  loanStatus:  joi.string().valid(LOAN_STATUS.SUBMISSION, LOAN_STATUS.APPROVED, LOAN_STATUS.REJECTED).required(),
});

const schema = new mongoose.Schema(joigoose.convert(loanSchema));
const Loan = mongoose.model('loan', schema);

module.exports = Loan;
