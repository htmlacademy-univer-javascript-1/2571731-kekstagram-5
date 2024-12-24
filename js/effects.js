const IMAGE_EFFECTS = {
  none: {style: 'none', min: 0, max: 100, step: 1, unit: '' },
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: {style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};
const DEFAULT_EFFECT = IMAGE_EFFECTS.none;

let currentEffect = DEFAULT_EFFECT;
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const imgUploadeffects = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const updateSliderOptions = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {min: currentEffect.min, max: currentEffect.max},
    start: currentEffect.max,
    step: currentEffect.step,
  });

  imgUploadEffectLevel.classList.toggle('hidden', isDefaultEffect());
};

effectLevelSlider.noUiSlider.on('update', () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  uploadPreviewImg.style.filter = isDefaultEffect()
    ? DEFAULT_EFFECT.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
});

const handleEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = IMAGE_EFFECTS[evt.target.value];
  uploadPreviewImg.className = `effects__preview--${evt.target.value}`;
  updateSliderOptions();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSliderOptions();
};

imgUploadeffects.addEventListener('change', handleEffectsChange);

export {resetEffects};
