/* exported PriorityQueue */
/* globals identity */

class PriorityQueue {
  constructor(metric = identity) {
    this.metric = metric;
    this.elements = [];
  }

  _getNextIndex() {
    return this.elements.indexOfMinimum(this.metric);
  }

  peek() {
    const nextIndex = this._getNextIndex();
    return nextIndex !== undefined ? this.elements[nextIndex] : undefined;
  }

  enqueue(element) {
    this.elements.push(element);
  }

  dequeue() {
    return this.elements.remove(this._getNextIndex());
  }

  delete(element) {
    this.elements.delete(element);
  }
}
