import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const socialComment = document.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_LIMIT = 5;

let commentsShowIndex = 0;

const createComment = ({avatar, name, message}) => {
  const comment = socialComment.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const lastIndex = Math.min(commentsShowIndex + COMMENTS_LIMIT, comments.length);

  const fragment = document.createDocumentFragment();
  for (let i = commentsShowIndex; i < lastIndex; i++) {
    fragment.appendChild(createComment(comments[i]));
  }
  socialComments.appendChild(fragment);
  commentsShowIndex = lastIndex;
  socialCommentCount.textContent = `${commentsShowIndex} из ${comments.length} комментариев`;

  if (commentsShowIndex >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderPhotoData = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsShowIndex = 0;
  renderPhotoData(data);
  socialComments.innerHTML = '';
  renderComments(data.comments);

  commentsLoader.onclick = () => {
    renderComments(data.comments);
  };

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoader.onclick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseBigPhoto = () => {
  closeBigPhoto();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

bigPictureCancel.addEventListener('click', onCloseBigPhoto);

export {showBigPicture};
