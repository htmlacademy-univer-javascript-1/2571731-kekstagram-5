import { renderBigPicture } from './full-size_images.js';
import { debounce } from './util.js';
import { shuffleArray } from './util.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterDefault = document.querySelector('#filter-default');
const container = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
let pictureListFragment = document.createDocumentFragment();
let defaultPictureList = '';

const sortByCommentCount = (a, b) => b.comments.length - a.comments.length;

function filterPictures(pictureArray) {
  if (filterRandom.classList.contains(ACTIVE_CLASS)) {
    return shuffleArray(pictureArray);
  } else if (filterDiscussed.classList.contains(ACTIVE_CLASS)) {
    return pictureArray.slice().sort(sortByCommentCount);
  }
  return pictureArray;
}

function updatePictureList(picturesList) {
  if (defaultPictureList === '') {
    defaultPictureList = picturesList;
  } else {
    container.querySelectorAll('.picture').forEach((el) => el.remove());
    pictureListFragment = document.createDocumentFragment();
  }
}

function fillPicture(picture) {
  const generatePic = thumbnailTemplate.cloneNode(true);
  const url = picture.url.startsWith('/') ? picture.url.slice(1) : picture.url;
  generatePic.querySelector('.picture__img').src = url;
  generatePic.querySelector('.picture__img').alt = picture.description;
  generatePic.querySelector('.picture__comments').textContent = picture.comments.length;
  generatePic.querySelector('.picture__likes').textContent = picture.likes;
  renderBigPicture(generatePic, picture.comments);
  return generatePic;
}


const renderPictureList = function(picturesList) {
  updatePictureList(picturesList);

  picturesList.forEach((picture) => {
    const generatePic = fillPicture(picture);
    pictureListFragment.appendChild(generatePic);
  });

  container.appendChild(pictureListFragment);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};


const onFilterClickDebounced = (filterButton) => {
  document.querySelector('.img-filters__button--active').classList.remove(ACTIVE_CLASS);
  filterButton.classList.add(ACTIVE_CLASS);
  debounce(() => {
    if (defaultPictureList !== '') {
      renderPictureList(filterPictures(defaultPictureList));
    }
  }, 500)();
};


function addFilterClickListener(filterButton) {
  filterButton.addEventListener('click', () => onFilterClickDebounced(filterButton));
}


addFilterClickListener(filterDefault);
addFilterClickListener(filterDiscussed);
addFilterClickListener(filterRandom);

export { renderPictureList, defaultPictureList };
