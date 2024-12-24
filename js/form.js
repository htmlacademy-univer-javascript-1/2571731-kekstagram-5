import { init as initScale, reset as resetScale } from './scale.js';
import { init as initSlider, reset as resetSlider } from './filters.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message.js';

const MAX_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимальное количество хэштегов - ${MAX_HASHTAGS}`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Хэштег должен начинаться с # и содержать только буквы и цифры.'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Готово!'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const body = document.body;

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showForm = () => {
  initScale();
  initSlider();
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

const hideForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetSlider();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === textDescription;

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = imgUploadInput.files[0];
  if (file && isValidType(file)) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
  showForm();
};

const onCancelButtonClick = () => hideForm();

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}
const normalizeTags = (tagString) => tagString.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagsLogic = (value) => {
  const tags = normalizeTags(value);
  const isValidCount = tags.length <= MAX_HASHTAGS;
  const isValidTags = tags.every((tag) => VALID_SYMBOLS.test(tag));
  const isUniqueTags = tags.length === new Set(tags.map((tag) => tag.toLowerCase())).size;

  return { isValidCount, isValidTags, isUniqueTags };
};

const validateHashtags = (value) => {
  const { isValidCount, isValidTags, isUniqueTags } = validateHashtagsLogic(value);
  return isValidCount && isValidTags && isUniqueTags;
};

const getHashtagErrorMessage = (value) => {
  const { isValidCount, isValidTags, isUniqueTags } = validateHashtagsLogic(value);

  if (!isValidCount) {
    return ErrorText.INVALID_COUNT;
  }
  if (!isValidTags) {
    return ErrorText.INVALID_PATTERN;
  }
  if (!isUniqueTags) {
    return ErrorText.NOT_UNIQUE;
  }
  return true;
};

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

pristine.addValidator(textHashtags, validateHashtags, getHashtagErrorMessage);

imgUploadForm.addEventListener('change', onFileInputChange);

imgUploadCancel.addEventListener('click', onCancelButtonClick);

export { setUserFormSubmit, hideForm };
