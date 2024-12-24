const IMAGE_FILTERS = {
  none: {style: 'none', min: 0, max: 100, step: 1, unit: '' },
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: {style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const DEFAULT_FILTER = IMAGE_FILTERS.none;

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');

let currentEffect = DEFAULT_FILTER;

const setImageStyle = () => {
  if(currentEffect.style === 'none') {
    imgUploadPreview.style.filter = '';
    return;
  }
  const { value } = sliderValue;
  const { style, unit } = currentEffect;
  imgUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = (options) => {
  noUiSlider.create(sliderElement, {
    range : {
      min: options.min,
      max: options.max,
    },
    start: options.max,
    step: options.step,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const destroySlider = () => {
  if(sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  setImageStyle();
};

const setSlider = () => {
  destroySlider();
  hideSlider();

  if (currentEffect.name !== 'none') {
    createSlider(currentEffect);
    showSlider();
  }
};

const setEffect = (effect) => {
  currentEffect = IMAGE_FILTERS.find((e) => e.name === effect);
  setSlider();
};

const reset = () => {
  setEffect(DEFAULT_FILTER.name);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  setSlider();
  effectsElement.addEventListener('change', onEffectsChange);
};

export { init, reset };
