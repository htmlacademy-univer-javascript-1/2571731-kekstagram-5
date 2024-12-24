const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = MAX_SCALE;

const scaleBigButton = document.querySelector('.scale__control--bigger');
const scaleSmallButton = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerControlClick = () => {
  scaleImage(Math.max(parseInt(scaleControlValue.value, 10) - STEP_SCALE, MIN_SCALE));
};

const onBiggerControlClick = () => {
  scaleImage(Math.min(parseInt(scaleControlValue.value, 10) + STEP_SCALE, MAX_SCALE));
};

const setScale = () => scaleImage(DEFAULT_SCALE);

const addListener = () => {
  scaleSmallButton.addEventListener('click', onSmallerControlClick);
  scaleBigButton.addEventListener('click', onBiggerControlClick);
};

const removeListener = () => {
  scaleSmallButton.removeEventListener('click', onSmallerControlClick);
  scaleBigButton.removeEventListener('click', onBiggerControlClick);
};

const init = () => {
  setScale();
  addListener();
};

const reset = () => {
  setScale();
  removeListener();
};

export { init, reset };
