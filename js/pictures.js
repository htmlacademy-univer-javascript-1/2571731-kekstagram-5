import {objects} from './data.js';

const pattern = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPicture = (data) => {
  const { likes, url, description, comments } = data;
  const picture = pattern.cloneNode(true);
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
};

const renderPictures = (pictures) => {
  container.querySelectorAll('.picture').forEach((picture) => picture.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newPicture = createPicture(picture);
    fragment.append(newPicture);
  });
  container.append(fragment);
};

renderPictures(objects);
