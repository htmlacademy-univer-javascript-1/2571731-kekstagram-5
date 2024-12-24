const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__social');
const commentsContainer = document.querySelector('.social__comment-count');

const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const COMMENTS_LIMIT = 5;
let displayedComments = [];
let commentsShowIndex = 0;

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  const commentPicture = comment.querySelector('.social__picture');
  commentPicture.src = avatar;
  commentPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const showComments = () => {
  commentsShowIndex += COMMENTS_LIMIT;
  if (commentsShowIndex >= displayedComments.length) {
    commentsLoader.classList.add('hidden');
    commentsShowIndex = displayedComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  const commentsToShow = displayedComments.slice(0, commentsShowIndex);

  commentsToShow.forEach(({avatar, name, message}) => {
    const comment = createComment({avatar, name, message});
    fragment.append(comment);
  });

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentsContainer.textContent = `${commentsShowIndex} из ${displayedComments.length} комментариев`;
};

const hideBigPicture = () => {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsShowIndex = 0;
  displayedComments = [];
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}
const renderBigPicture = ({url, likes, description}) => {
  const bigPictureImg = pictureContainer.querySelector('.big-picture__img img');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  pictureImage.querySelector('.likes-count').textContent = likes;
  pictureImage.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (picture) => {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  commentsLoader.classList.remove('hidden');
  commentsContainer.classList.remove('hidden');
  renderBigPicture(picture);
  displayedComments = picture.comments;
  showComments();
};

const onCancelButtonClick = () => hideBigPicture();

const onCommentsLoaderClick = () => showComments();

pictureCloseButton.addEventListener('click', onCancelButtonClick);

commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
