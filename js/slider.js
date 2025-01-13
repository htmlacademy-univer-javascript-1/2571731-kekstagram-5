const SLIDER_ELEMENT = document.querySelector('.effect-level__slider');
const SLIDER_VALUE = document.querySelector('.effect-level__value');
const imageUploadElement = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');

let selectedEffect = 'none';

const createSlider = () => {
  sliderContainer.classList.add('hidden');

  noUiSlider.create(SLIDER_ELEMENT, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
  });

  SLIDER_ELEMENT.noUiSlider.on('update', () => {
    let value = parseFloat(SLIDER_ELEMENT.noUiSlider.get()).toFixed(1);
    if (value.endsWith('.0')) {
      value = parseFloat(value).toFixed(0);
    }
    SLIDER_VALUE.value = value;
    applyFilter(SLIDER_VALUE.value);
  });
};

function applyFilter(value){
  switch (selectedEffect) {
    case 'chrome':
      imageUploadElement.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imageUploadElement.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imageUploadElement.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imageUploadElement.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imageUploadElement.style.filter = `brightness(${value})`;
      break;
    case 'none':
      imageUploadElement.style.filter = '';
      break;
  }
}

const updateSliderOptions = (min, max, start, step) => {
  SLIDER_ELEMENT.noUiSlider.updateOptions({
    range: { min, max },
    start,
    step,
  });
};

const handleEffectClick = (evt) => {
  const effectItem = evt.target.closest('.effects__item');

  if (!effectItem) {
    return;
  }

  const effectInput = effectItem.querySelector('input[type="radio"]');
  selectedEffect = effectInput.value;

  switch (selectedEffect) {
    case 'chrome':
    case 'sepia':
      updateSliderOptions(0, 1, 1, 0.1);
      break;
    case 'marvin':
      updateSliderOptions(0, 100, 100, 1);
      break;
    case 'phobos':
      updateSliderOptions(0, 3, 3, 0.1);
      break;
    case 'heat':
      updateSliderOptions(1, 3, 3, 0.1);
      break;
    case 'none':
      imageUploadElement.style.filter = '';
      sliderContainer.classList.add('hidden');
      return;
  }

  sliderContainer.classList.remove('hidden');
  SLIDER_ELEMENT.noUiSlider.set(SLIDER_ELEMENT.noUiSlider.options.start);
  applyFilter(SLIDER_ELEMENT.noUiSlider.get());
};

document.querySelector('.effects__list').addEventListener('click', handleEffectClick);

export { createSlider };
