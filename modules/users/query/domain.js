const logger = require('../../../helpers/utils/logger');
const { CODE: httpCode } = require('../../../helpers/utils/commons');

const User = require('../schema/userSchema');

class UserQuery {
  static async getUserById(payload, response) {
    const ctx = 'user-getUserById';

    const user = await User.findOne({ userId: payload.params.userId });
    logger.log(ctx, 'User data displayed.', 'Mentor');
    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: user,
      message: 'Data user berhasil ditampilkan.',
      code: httpCode.SUCCESS
    });
  }
}


module.exports = UserQuery;
