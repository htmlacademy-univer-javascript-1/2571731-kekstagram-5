import {isEscapeKey} from './util.js';

const body = document.querySelector('body');


const closeMessage = (evt, messageClass) => {
  const isClick = evt.type === 'click';
  const isKeydown = evt.type === 'keydown' && isEscapeKey(evt);

  if (isClick || isKeydown) {
    const message = document.querySelector(messageClass);

    if (message) {
      if (isClick && (evt.target.classList.contains(`${messageClass.slice(1)}__button`) || !evt.target.classList.contains(`${messageClass.slice(1)}__inner`))) {
        body.removeEventListener('click', closeMessage);
        body.removeEventListener('keydown', closeMessage);
        message.remove();
      } else if (isKeydown) {
        body.removeEventListener('click', closeMessage);
        body.removeEventListener('keydown', closeMessage);
        message.remove();
      }
    }
  }
};

const showMessage = (id) => {
  const messageTemplate = document.querySelector(id).content;
  const message = messageTemplate.cloneNode(true);
  body.appendChild(message);
};

const showLoadError = () => {
  const showAlertElement = document.createElement('div');
  showAlertElement.classList.add('load_error');
  showAlertElement.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.append(showAlertElement);
};

const showSuccessMessage = () => {
  body.addEventListener('keydown', (evt) => closeMessage(evt, '.success'));
  body.addEventListener('click', (evt) => closeMessage(evt, '.success'));
  showMessage('#success');
};

const showErrorMessage = () => {
  const showAlertElement = document.createElement('div');
  showAlertElement.classList.add('load_error');
  showAlertElement.textContent = 'Не удалось отправить форму. Пожалуйста, исправьте некорректные значения и попробуйте снова';
  document.body.append(showAlertElement);

  setTimeout(() => {
    showAlertElement.remove();
  }, 5000);
};

export {showLoadError, showSuccessMessage, showErrorMessage};
