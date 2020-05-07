function createUUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

class Queue {
  constructor() {
    this.elements = []
  }

  enqueue(value) {
    this.elements.push(value)
  }

  dequeue() {
    return this.elements.shift()
  }
  
  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined
  }

  isEmpty() {
    return this.elements.length == 0
  }

  length() {
    return this.elements.length
  }
}