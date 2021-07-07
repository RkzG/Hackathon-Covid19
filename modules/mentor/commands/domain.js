const { v4: uuid } = require('uuid');

const logger = require('../../../helpers/utils/logger');
const { CODE: httpCode } = require('../../../helpers/utils/commons');

const Mentor = require('../schema/mentorSchema');

class MentorCommand {
  static async registerMentor(payload, response) {
    const ctx = 'mentor-registerMentor';
    const data = payload.body;

    const findMentor = await Mentor.findOne({
      name: data.name,
      email: data.email,
      phone: data.phone
    });
    if (findMentor) {
      logger.error(ctx, 'Mentor already registered.', 'Error');
      return response.status(httpCode.BAD_REQUEST).json({
        success: false,
        data: '',
        message: 'Mentor telah terdaftar!',
        code: httpCode.BAD_REQUEST
      });
    }

    const mentor = new Mentor({
      mentorId: uuid(),
      memberDate: new Date().toISOString(),
      ...data
    });
    await mentor.save();

    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: mentor,
      message: 'Data mentor berhasil tersimpan.',
      code: httpCode.SUCCESS
    });
  }
}

module.exports = MentorCommand;
