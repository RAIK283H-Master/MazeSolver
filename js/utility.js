/* exported identity */

const identity = (value) => value;

Array.prototype.top = function top(index = 0) {
  return this[this.length - 1 - index];
};

Array.prototype.reverse = function reverse() {
  const result = [];
  for (let i = this.length; i--;) {
    result.push(this[i]);
  }
  return result;
};

Array.prototype.indexOfMinimum = function indexOfMinimum(metric = identity) {
  let index = undefined;
  for (let i = this.length, minimum = Infinity; i--;) {
    const measure = metric(this[i]);
    if (measure <= minimum) {
      index = i;
      minimum = measure;
    }
  }
  return index;
};

Array.prototype.remove = function remove(index) {
  return index >= 0 ? this.splice(index, 1)[0] : undefined;
};

Array.prototype.delete = function(element) { // eslint-disable-line func-names, (reserved word)
  this.remove(this.indexOf(element));
  return this;
};
