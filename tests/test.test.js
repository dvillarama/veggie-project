const { sum } = require('../src/sum');

test('add 1 + 2 to equal 3', () => {
  expect(sum([1,2])).toBe(3);
});

test('add 1 + 2 + 3 to equal 3', () => {
  expect(sum([1,2,3])).toBe(6);
});
