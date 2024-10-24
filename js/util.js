const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueRandomNumberList = (min, max, length) => {
  const previousNumbers = [];
  while (previousNumbers.length < length) {
    let currentValue = getRandomInteger(min, max);
    while (previousNumbers.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousNumbers.push(currentValue);
  }
  return previousNumbers;
};

const getUniqueNumber = (list, usedNumbers) => {
  for (let i = 0; i < list.length; i++){
    if (usedNumbers.includes(list[i]) === false){
      usedNumbers.push(list[i]);
      return list[i];
    }
  }
};

export {
  getRandomInteger,
  createUniqueRandomNumberList,
  getUniqueNumber
};
