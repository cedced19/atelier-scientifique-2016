module.exports = function (values, q) {
    var third = Math.floor((q * values.length)/4);
    if (values.length % 2) {
      return values[third];
    }
    return values[third+1];
}
