function checkStrLength(str, len){
  if(str.Length <= len){
    return true;
  }
  return false;
}

function checkPalindrome(str){
  const testStr1 = str.replaceAll(' ', '').toLowerCase();
  const testStr2 = testStr1.split('').reverse().join('');
  if(testStr1 === testStr2) {
    return true;
  }
  return false;
}

function makeDigit(str){
  let digit = '';
  for(let i=0; i<str.length;i++){
    if(!Number.isNaN(+str[i])){
      digit = digit + str[i];
    }
  }
  return +digit;
}
