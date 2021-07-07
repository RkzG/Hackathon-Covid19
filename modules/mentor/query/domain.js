const logger = require('../../../helpers/utils/logger');
const { convertToRupiah } = require('../../../helpers/utils/utils');
const { CODE: httpCode } = require('../../../helpers/utils/commons');

const Mentor = require('../schema/mentorSchema');

class MentorQuery {
  static async getMentor(payload, response) {
    const ctx = 'mentor-getMentor';

    let listData = [];
    const mentor = await Mentor.find({});
    logger.log(ctx, 'All mentor data displayed.', 'Mentor');

    listData = await Promise.all(mentor.map(async (val) => {
      return {
        mentorId: val.mentorId,
        name: val.name,
        fee: convertToRupiah(parseInt(val.fee)),
        address: val.address,
        rating: val.rating,
      };
    }));

    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: listData,
      message: 'Data para mentor berhasil ditampilkan.',
      code: httpCode.SUCCESS
    });
  }

  static async getMentorById(payload, response) {
    const ctx = 'mentor-getMentorById';

    const mentor = await Mentor.findOne({ mentorId: payload.params.mentorId });
    logger.log(ctx, 'Mentor data displayed.', 'Mentor');
    return response.status(httpCode.SUCCESS).json({
      success: true,
      data: {
        mentorId: mentor.mentorId,
        name: mentor.name,
        rating: mentor.rating,
        biodata: mentor.biodata,
        fee: convertToRupiah(parseInt(mentor.fee)),
        memberDate: mentor.memberDate,
        education: mentor.education,
        certification: mentor.certification,
      },
      message: 'Data mentor berhasil ditampilkan.',
      code: httpCode.SUCCESS
    });
  }
}

module.exports = MentorQuery;
