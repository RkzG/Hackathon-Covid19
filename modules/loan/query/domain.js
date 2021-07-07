const logger = require('../../../helpers/utils/logger');
const { CODE: httpCode } = require('../../../helpers/utils/commons');

const Loan = require('../schema/loanSchema');

class LoanQuery {
  static async getDetailLoan(payload, response) {
    const ctx = 'loan-getDetailLoan';

    const loan = await Loan.findOne({ loanId: payload.params.loanId });
    logger.log(ctx, 'User data displayed.', 'Mentor');
    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: loan,
      message: 'Data user berhasil ditampilkan.',
      code: httpCode.SUCCESS
    });
  }
}

module.exports = LoanQuery;
