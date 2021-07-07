const { v4: uuid } = require('uuid');

const { CODE: httpCode } = require('../../../helpers/utils/commons');

const Loan = require('../schema/loanSchema');

class LoanCommand {
  static async requestLoan(payload, response) {
    const data = payload.body;

    const loan = new Loan({
      loanId: uuid(),
      requestDate: new Date().toISOString(),
      ...data
    });
    await loan.save();

    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: loan,
      message: 'Data loan berhasil tersimpan.',
      code: httpCode.SUCCESS
    });
  }
}

module.exports = LoanCommand;
