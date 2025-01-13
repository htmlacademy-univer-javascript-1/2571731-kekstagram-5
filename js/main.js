import {renderPictureList} from './rendering.js';
import { openForm } from './form.js';
import { scaleImg } from './scale.js';
import { createSlider } from './slider.js';
import { fentchData } from './api.js';

fentchData('GET', renderPictureList);
openForm();
scaleImg();
createSlider();
