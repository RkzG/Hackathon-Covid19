const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const validate = require('validate.js');
const otpGenerator = require('otp-generator');

const logger = require('../../../helpers/utils/logger');
const config = require('../../../helpers/config/config');
const { CODE: httpCode } = require('../../../helpers/utils/commons');

// Twilio API
const fromTw = config.get('/twPhone');
const tw = require('twilio')(config.get('/twSid'), config.get('/twAuth'));

const User = require('../schema/userSchema');
const usersHelper = require('../helpers/usersHelper');

class UserCommand {
  static async registerUser(payload, response) {
    const ctx = 'users-registerUser';
    const data = payload.body;

    const findUser = await User.findOne({ email: data.email });
    if (findUser) {
      logger.error(ctx, 'Email already registered.', 'Error');
      return response.status(httpCode.CONFLICT).json({
        success: false,
        data: '',
        message: 'Email telah terdaftar!',
        code: httpCode.CONFLICT
      });
    }

    const salting = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salting);

    const otp = otpGenerator.generate(6, { alphabets: false, specialChars: false });

    const phoneNumber = usersHelper.replaceChar(data.phone, 0, '+62');
    tw.messages.create({
      body: `Kode OTP anda adalah ${otp}`,
      from: fromTw,
      to: phoneNumber
    });

    const user = new User({
      userId: uuid(),
      ...data,
      otp: otp,
      memberDate: new Date().toISOString(),
      isFirstTime: true,
      isVerified: false,
      isTwoFactor: false,
    });
    await user.save();

    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: user,
      message: 'Pendaftaran berhasil, silakan login dan masukan kode OTP anda.',
      code: httpCode.SUCCESS
    });
  }

  static async loginUser(payload, response) {
    const ctx = 'users-loginUser';
    const data = payload.body;
    const user = await User.findOne({ email: data.email });

    if (user.isFirstTime) {
      if (validate.isEmpty(data.otp)) {
        logger.error(ctx, 'OTP not inserted.', 'Error');
        return response.status(httpCode.BAD_REQUEST).json({
          success: false,
          data: null,
          message: 'Silakan masukan kode OTP anda.',
          code: httpCode.BAD_REQUEST
        });
      }
    }

    if (user) {
      const validatePassword = await bcrypt.compare(data.password, user.password);
      if (validatePassword) {
        let result;
        const token = await jwt.sign({ email: data.email }, config.get('/secret'), { expiresIn: '24h' });
        await User.findOneAndUpdate({ email: data.email, otp: data.otp },
          { $unset: { otp: 1, isFirstTime: 1 } }, { new: true }, (err, docs) => {
            err ? logger.log(ctx, err, 'Error') : result = docs;
          }
        );

        const res = {
          userId: result.userId,
          name: result.name,
          phone: result.phone,
          memberDate: result.memberDate,
          isVerified: result.isVerified,
          isTwoFactor: result.isTwoFactor,
          accessToken: token
        };
        return response.status(httpCode.SUCCESS).json({
          success: true,
          data: res,
          message: 'Anda telah login!',
          code: httpCode.SUCCESS
        });
      }

      logger.error(ctx, 'Incorrect credentials.', 'Error');
      return response.status(httpCode.UNAUTHORIZED).json({
        success: false,
        data: null,
        message: 'Data anda salah!',
        code: httpCode.UNAUTHORIZED
      });
    }

    logger.error(ctx, 'User not found.', 'Error');
    return response.status(httpCode.NOT_FOUND).json({
      success: false,
      data: null,
      message: 'User tidak ditemukan!',
      code: httpCode.NOT_FOUND
    });
  }
}

module.exports = UserCommand;
