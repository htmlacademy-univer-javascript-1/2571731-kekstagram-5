import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import './photo.js';

const MAX_HASHTAGS_COUNT = 5;
const CHARACTERS_MAX_COUNT = 140;
const VALID_SYMBOLS = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

const HashtagErrorMessage = {
  INVALID_HASHTAG: 'Ошибка! Хэш-тег должен начинаться с # и содержать только буквы и цифры.',
  NOT_UNIQUE: 'Ошибка! Хэш-теги не должны повторяться.',
  HASHTAGS_MAX_COUNT: `Ошибка! Нельзя использовать больше ${MAX_HASHTAGS_COUNT} хэш-тэгов.`,
  MAX_COMMENT_LENGTH: `Ошибка! Максимальная длина ${CHARACTERS_MAX_COUNT} символов.`
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const closeUploadFormButton = form.querySelector('.img-upload__cancel');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const submitFormButton = form.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const shareHashtags = (input) => input.toLowerCase().trim().split(' ').filter((tag) => tag.length > 0);

const isHashtagsValid = (input) => {
  const tags = shareHashtags(input);
  return tags.every((tag) => VALID_SYMBOLS.test(tag));
};

const isHashtagsUnique = (input) => {
  const tags = shareHashtags(input);
  return tags.length === new Set(tags).size;
};

const isHashtagsLimited = (input) => shareHashtags(input).length <= MAX_HASHTAGS_COUNT;

const isCommentLengthValid = (input) => input.length <= CHARACTERS_MAX_COUNT;

pristine.addValidator(hashtagInput, isHashtagsValid, HashtagErrorMessage.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsUnique, HashtagErrorMessage.NOT_UNIQUE);
pristine.addValidator(hashtagInput, isHashtagsLimited, HashtagErrorMessage.HASHTAGS_MAX_COUNT);
pristine.addValidator(descriptionInput, isCommentLengthValid, HashtagErrorMessage.MAX_COMMENT_LENGTH);
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  form.reset();
  pristine.reset();

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onHashtagsInput = () => {
  pristine.validate(hashtagInput);
};

const onDescriptionInput = () => {
  pristine.validate(descriptionInput);
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
  } else {
    showErrorMessage();
    submitFormButton.disabled = false;
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === descriptionInput)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

hashtagInput.addEventListener('input', onHashtagsInput);
descriptionInput.addEventListener('input', onDescriptionInput);
uploadInput.addEventListener('change', openUploadForm);
submitFormButton.addEventListener('click', onSubmit);
closeUploadFormButton.addEventListener('click', closeUploadForm);
