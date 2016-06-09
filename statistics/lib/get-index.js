module.exports = function (value, array, property) {
  for (var i in array) {
    if (array[i][property] == value) {
      return i;
    }
  }
  return false;
};
