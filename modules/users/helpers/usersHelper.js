const replaceChar = (str, index, char) => {
  if(index > str.length - 1) return str;
  return str.substring(0, index) + char + str.substring(index + 1);
};

module.exports = {
  replaceChar
};

