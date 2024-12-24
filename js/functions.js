function checkLength (string, length) {
  return (string.length <= length);
}

function isPalindrom (string) {
  const newString = string.replaceAll(' ','').toLowerCase();
  let stringToCompare = '';
  for (let i = newString.length - 1; i >= 0 ; i--) {
    stringToCompare += newString[i];
  }
  return (stringToCompare === newString);
}

function parseLine (line) {
  const string = (typeof line === 'number') ? String(line) : line;
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
}

checkLength('проверяемая строка', 18);
isPalindrom('Лёша на полке клопа нашёл');
parseLine('1 кефир, 0.5 батона');
