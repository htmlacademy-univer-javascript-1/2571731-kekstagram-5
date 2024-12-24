import { showBigPicture } from './full-size_images.js';
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  pictures.forEach(({url, description, comments, likes}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture({url, description, comments, likes});
    });
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
};

export { createThumbnail };
