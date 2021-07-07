const CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

const LOAN_STATUS = {
  SUBMISSION: 'SUBMISSION',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

const RELIGION = {
  ISLAM: 'Islam',
  KRISTEN: 'Kristen',
  KATOLIK: 'Katolik',
  HINDU: 'Hindu',
  BUDDHA: 'Buddha',
  KONGHUCU: 'Konghucu'
};

const MARITAL_STATUS = {
  SINGLE: 'Belum Kawin',
  MARRIED: 'Kawin',
  DIVORCED: 'Cerai Hidup',
  DEATH_DIVORCED: 'Cerai Mati'
};

const RESIDENCE = {
  HOME: 'Rumah',
  KOST: 'Kost',
  RENT: 'Kontrakan',
  APARTMENT: 'Apartemen'
};

module.exports = {
  CODE,
  LOAN_STATUS,
  RELIGION,
  RESIDENCE,
  MARITAL_STATUS
};
