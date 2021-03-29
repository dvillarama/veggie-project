const sum = (nums = []) => {
  return nums.reduce((acc, num) => acc + num);
};

module.exports = { sum };
