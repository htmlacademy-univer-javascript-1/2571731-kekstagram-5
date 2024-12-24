const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

let currentMessage = null;

const hideMessage = (message) => {
  message.remove();
  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', onOutsideClick);
};

function onEscKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage(currentMessage);
  }
}

function onOutsideClick (evt) {
  if (!evt.target.closest('div')) {
    hideMessage(currentMessage);
  }
}

const onCloseButtonClick = () => hideMessage(currentMessage);

const showMessage = (message, buttonSelector) => {
  currentMessage = message;
  body.appendChild(currentMessage);
  currentMessage.querySelector(buttonSelector)
    .addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  body.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => showMessage(errorMessage, '.error__button');
const showSuccessMessage = () => showMessage(successMessage, '.success__button');

export { showErrorMessage, showSuccessMessage };
