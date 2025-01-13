import { onEscapePress } from './util.js';

const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const createMessageHandler = (template) => () => {
  const message = template.cloneNode(true);
  const closeButton = message.querySelector('button');

  const onDocumentKeydown = (evt) => onEscapePress(evt, closeMessage);

  function closeMessage(){
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentClick(evt){
    if (evt.target === message) {
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  body.appendChild(message);
};

const showSuccess = createMessageHandler(SUCCESS_TEMPLATE);
const showError = createMessageHandler(ERROR_TEMPLATE);

export { showSuccess, showError };
