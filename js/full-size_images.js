import { onEscapePress } from './util.js';

const MAX_COMMENT_TO_LOAD = 5;
const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const clone = bigPicture.querySelector('.social__comment').cloneNode(true);
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsShown = 0;
let currentComments = [];

bigPicture.querySelectorAll('.social__comment').forEach((el) => (el.innerHTML = ''));

function fillBigPicture(picture, comments) {
  const src = picture.querySelector('.picture__img').src;
  bigPicImg.src = new URL(src, document.baseURI).pathname.slice(1);
  likesCount.textContent = picture.querySelector('.picture__likes').textContent;
  commentsCount.textContent = comments.length;
  currentComments = comments;
  commentsShown = 0;

  fillComments();

  socialCaption.textContent = picture.querySelector('.picture__img').alt;
  socialCommentCount.classList.remove('hidden');

  if(comments.length > MAX_COMMENT_TO_LOAD) {
    commentsLoader.classList.remove('hidden');
  }
  bigPicture.classList.remove('hidden');
}

function fillComments() {
  const fragment = document.createDocumentFragment();
  const commentsToShow = currentComments.slice(commentsShown , commentsShown + 5);

  commentsToShow.forEach((commentData) => {
    const comment = clone.cloneNode(true);
    const avatarPath = new URL(commentData.avatar, document.baseURI).pathname.slice(1);
    comment.querySelector('.social__picture').src = avatarPath;
    comment.querySelector('.social__picture').alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;

    fragment.appendChild(comment);
  });
  if (commentsShown === 0) {
    socialComments.innerHTML = '';
  }
  socialComments.appendChild(fragment);

  commentsShown += commentsToShow.length;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }

  updateCommentCount();
}

function updateCommentCount() {
  socialCommentCount.textContent = `${commentsShown } из ${currentComments.length} комментариев`;
}

commentsLoader.addEventListener('click', fillComments);

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => onEscapePress(evt, closeBigPicture);

function renderBigPicture(picture, comments) {
  picture.addEventListener('click', () => {
    fillBigPicture(picture, comments);
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  socialComments.innerHTML = '';
}

closeButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', onEscapePress(closeBigPicture));

export { renderBigPicture };
