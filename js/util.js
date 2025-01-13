const DEBOUNCE_DELAY = 500;
const SHUFFLE_LIMIT = 10;

function isEscapeKey(evt, funcName){
  if(evt.key === 'Escape'){
    funcName();
  }
}

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffleArray(array) {
  const length = array.length;
  const shuffle = array.slice();

  for (let i = length - 1; i > 0; i -= 1) {
    const random = Math.floor(Math.random() * (i + 1));
    const current = shuffle[i];
    shuffle[i] = shuffle[random];
    shuffle[random] = current;
  }

  return shuffle.slice(0, SHUFFLE_LIMIT);
}

export { isEscapeKey as onEscapePress, debounce, shuffleArray };
