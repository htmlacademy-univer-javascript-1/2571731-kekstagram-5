import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import './photo.js';

const MAX_HASHTAGS_COUNT = 5;
const CHARACTERS_MAX_COUNT = 140;
const VALID_SYMBOLS = /^(#([a-zA-Zа-яА-Я0-9]{1,19})|)$/;
const HashtagErrorMessage = {
  INVALID_HASHTAG: 'Ошибка! Хэш-тег должен начинаться с # и содержать только буквы и цифры.',
  NOT_UNIQUE: 'Ошибка! Хэш-теги не должны повторяться',
  HASHTAGS_MAX_COUNT:`Ошибка! Нельзя использовать больше ${MAX_HASHTAGS_COUNT} хэш-тэгов`,
  MAX_COMMENT_LENGTH: `Ошибка! Максимальная длина ${CHARACTERS_MAX_COUNT} символов`
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadFormButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitFormButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const shareHashtags = (input) => input.toLowerCase().trim().split(' ');
const isHashtagsValid = (input) => shareHashtags(input).every((tag) => VALID_SYMBOLS.test(tag));
const isHashtagsUnique = (input) => shareHashtags(input).length === new Set(shareHashtags(input)).size;
const isHashtagsLimited = (input) => shareHashtags(input).length <= MAX_HASHTAGS_COUNT;

pristine.addValidator(hashtagInput, isHashtagsValid, HashtagErrorMessage.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsUnique, HashtagErrorMessage.REPLAY_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsLimited, HashtagErrorMessage.HASHTAGS_MAX_COUNT);
pristine.addValidator(descriptionInput, (value) => value.length <= CHARACTERS_MAX_COUNT, HashtagErrorMessage.MAX_COMMENT_LENGTH);

const validatePristine = () => pristine.validate();

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onOpenUploadForm = () => {
  openUploadForm();
};

const closeUploadForm = () => {
  form.reset();
  pristine.reset();

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseUploadForm = () => {
  closeUploadForm();
};

const onSubmit = (evt) => {
  evt.preventDefault();
  submitFormButton.disabled = true;

  if (pristine.validate()) {
    sendData(
      () => {
        showSuccessMessage();
        closeUploadForm();
        submitFormButton.disabled = false;
      },
      () => {
        showErrorMessage();
        submitFormButton.disabled = false;
      },
      new FormData(form)
    );
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === descriptionInput)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

hashtagInput.addEventListener('change', validatePristine);
descriptionInput.addEventListener('change', validatePristine);
uploadInput.addEventListener('change', onOpenUploadForm);
submitFormButton.addEventListener('click', onSubmit);
closeUploadFormButton.addEventListener('click', onCloseUploadForm);
