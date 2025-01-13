import { defaultPictureList } from './rendering.js';
import { shuffleArray } from './util.js';

const imgFiltersElement = 'img-filters__button--active';
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

function sortByCommentCount(a, b) {
  return b.comments.length - a.comments.length;
}

function filterPictures(pictureArray) {
  if (filterRandomButton.classList.contains(imgFiltersElement)) {
    return shuffleArray(pictureArray);
  } else if (filterDiscussedButton.classList.contains(imgFiltersElement)) {
    return defaultPictureList.slice().sort(sortByCommentCount);
  }
  return defaultPictureList;
}

export{filterPictures};
