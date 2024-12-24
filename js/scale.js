const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = MAX_SCALE;

let currentScale = DEFAULT_SCALE;
const previewImg = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmallButton = document.querySelector('.scale__control--smaller');
const scaleBigButton = document.querySelector('.scale__control--bigger');

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  previewImg.style.transform = `scale(${currentScale / 100})`;
};

const onSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP_SCALE;
    updateScale();
  }
};

const onBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP_SCALE;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};

scaleSmallButton.addEventListener('click', onSmallerButtonClick);
scaleBigButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
