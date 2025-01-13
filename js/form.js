import { onEscapePress } from './util.js';
import { showSuccess, showError } from './message.js';
import { fentchData } from './api.js';

const MAX_HASHTAG_COUNT = 5;
const CHARACTERS_MAX_COUNT = 140;
const EFFECT_LEVEL_HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';

const imgUpload = document.querySelector('.img-upload__preview');
const imgPreview = imgUpload.querySelector('img');
const scaleValue = document.querySelector('.scale__control--value');

const file = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const submitFormButton = form.querySelector('#upload-submit');

const VALID_SYMBOLS = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;
const errors = {
  invalidCount: 'Колчичество хэштегов больше пяти!',
  invalidUnique: 'Хэштеги не должны повторяться!',
  invalidReg: 'Некорректный хэштег!'
};
const closeButton = document.querySelector('.img-upload__cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

let errorType = '';

const onDocumentKeydown = (evt) => {
  if(document.activeElement !== hashtagInput && document.activeElement !== descriptionInput){
    onEscapePress(evt, closeForm);
  }
};

file.addEventListener('change', () => {
  const selectedFile = file.files[0];
  if (selectedFile) {
    const objectURL = URL.createObjectURL(selectedFile);
    imgPreview.src = objectURL;
    const effectPreviews = document.querySelectorAll('.effects__preview');
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url("${objectURL}")`;
    });
    imgUploadOverlay.classList.remove(EFFECT_LEVEL_HIDDEN_CLASS);
    body.classList.add(MODAL_OPEN_CLASS);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

function openForm(){
  file.addEventListener('change', () => {
    imgUploadOverlay.classList.remove(EFFECT_LEVEL_HIDDEN_CLASS);
    body.classList.add(MODAL_OPEN_CLASS);
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

function closeForm(){
  imgUploadOverlay.classList.add(EFFECT_LEVEL_HIDDEN_CLASS);
  body.classList.remove(MODAL_OPEN_CLASS);
  file.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  pristine.reset();
  form.reset();
  imgPreview.style.transform = 'scale(1)';
  imgPreview.style.filter = '';
  document.querySelector('.img-upload__effect-level').classList.add(EFFECT_LEVEL_HIDDEN_CLASS);
  scaleValue.value = '100%';
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click',closeForm);

function validateHashtag(value){
  const hashtegs = value.split(/\s+/).filter(Boolean);

  if(hashtegs.length > MAX_HASHTAG_COUNT){
    errorType = 'invalidCount';
    return false;
  }

  const lowCaseHashtegs = hashtegs.map((el) => el.toLowerCase());
  const uniqueHashtegs = new Set(lowCaseHashtegs);
  if(uniqueHashtegs.size !== hashtegs.length){
    errorType = 'invalidUnique';
    return false;
  }

  for(let i = 0; i < hashtegs.length; i++){
    if(!VALID_SYMBOLS.test(hashtegs[i])){
      errorType = 'invalidReg';
      return false;
    }
  }

  return true;
}

function validateDescription(value){
  return value.length <= CHARACTERS_MAX_COUNT;
}

pristine.addValidator(hashtagInput,validateHashtag, () => errors[errorType]);
pristine.addValidator(descriptionInput, validateDescription, 'Превышена длинна комментария!');

const onSuccess = () =>{
  submitFormButton.disabled = false;
  closeForm();
  showSuccess();
};

const onError = () =>{
  submitFormButton.disabled = false;
  document.removeEventListener('keydown', onDocumentKeydown);
  showError();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitFormButton.disabled = true;
    const formData = new FormData(form);
    submitFormButton.disabled = true;
    fentchData('POST',onSuccess,onError,formData);
  }
});

export {openForm};
