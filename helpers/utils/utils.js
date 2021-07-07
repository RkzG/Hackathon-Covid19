const validate = require('validate.js');

const convertToRupiah = (params) => {
  const number = validate.isNumber(params) ? params : 0;
  let text = number.toString();
  const textReverse = text.toString().split('').reverse().join('');
  text = textReverse.match(new RegExp('\\d{1,3}', 'gi'));
  text = `Rp ${text.join('.').split('').reverse().join('')}`;
  return `${text}`;
};

module.exports = {
  convertToRupiah
};
