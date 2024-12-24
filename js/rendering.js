import { showBigPicture } from './full-size_images.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');


const createThumbnail = ({url, description, likes, comments}) => {
  const photosElement = thumbnailTemplate.cloneNode(true);
  photosElement.querySelector('.picture__img').src = url;
  photosElement.querySelector('.picture__img').alt = description;
  photosElement.querySelector('.picture__likes').textContent = likes;
  photosElement.querySelector('.picture__comments').textContent = comments.length;

  return photosElement;
};

const renderThumbnails = (photos) => {
  const existingPhotos = container.querySelectorAll('.picture');
  existingPhotos.forEach((picture) => picture.remove());
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picturesElement = createThumbnail(photo);
    picturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(photo);
    });
    fragment.appendChild(picturesElement);
  });
  container.appendChild(fragment);
};

export{renderThumbnails};
