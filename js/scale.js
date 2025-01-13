const MAX_SCALE = '100%';
const MIN_SCALE = '25%';
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imgUpload = document.querySelector('.img-upload__preview img');

const updateScale = (increment) => {
  const currentValue = parseInt(scaleControlValue.value.replace('%', ''), 10);
  const newValue = currentValue + increment;

  if (newValue <= parseInt(MAX_SCALE, 10) && newValue >= parseInt(MIN_SCALE, 10)) {
    scaleControlValue.value = `${newValue}%`;
    imgUpload.style.transform = `scale(${newValue / 100})`;
  }
};

const scaleImg = () => {
  scaleBigger.addEventListener('click', () => updateScale(25));
  scaleSmaller.addEventListener('click', () => updateScale(-25));
};

export { scaleImg };
