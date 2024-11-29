// src/sum.js (this is the function we're testing)
function sum(a, b) {
    return a + b;
  }
  
  module.exports = sum;

  // src/sum.test.js (test for the sum function)
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});