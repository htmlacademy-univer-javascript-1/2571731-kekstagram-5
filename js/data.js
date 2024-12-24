import { getRandomArrayElement, getRandomInteger, createIdGenerator } from './utils.js';

const COUNT_PHOTOS = 25;
const COUNT_AVATARS = 6;
const DESCRIPTIONS_PHOTOS = ['Красота', 'Какой же чудесный день сегодня!', 'Ну нежность',
  'Просто посмотрите на эту сказку', 'Танцуйте. Влюбляйтесь. Творите.', 'Нет слов.',
  'Без комментариев', 'Я и мои друзья', 'Семья!',
  'Всех с праздником', 'Всем хорошего дня!',
  'Очень интересный кадр', 'В моменте', 'Просто так', 'Любовь',
  'Хочу тоже так', 'Ваууу', 'Ну вот и что это...',
  'Солнышко', 'Мяу мяу мяу мяу', 'Оцените', 'Как вам такое?!',];

const MESSAGES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAME_COMMENTS = ['Маша', 'Катя', 'Полина', 'Арсений', 'Алёна', 'Эдик', 'Матвей', 'Камилла', 'Олеся', 'Ксюша',
  'Даша', 'Соня','Семён', 'Александр', 'Никита', 'Екатерина', 'Аннушка', 'Данил', 'Петя', 'Лёва',
  'Влад', 'Денис', 'Алина', 'Максим', 'Женя', 'Рома', 'Ольга', 'Феликс', 'Эмма', 'Дмитрий'];

const createMessage = () => getRandomInteger(0, 1) ? getRandomArrayElement(MESSAGES_COMMENTS) : `${getRandomArrayElement(MESSAGES_COMMENTS)} ${getRandomArrayElement(MESSAGES_COMMENTS)}`;

const generateIdComment = createIdGenerator();
const createComments = function() {
  const comments = [];
  const count = getRandomInteger(0, 30);
  for(let i = 0; i < count; i++) {
    comments.push({
      id:generateIdComment(),
      avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATARS)}.svg`,
      message: createMessage(),
      name: getRandomArrayElement(NAME_COMMENTS)
    });
  }
  return comments;
};

const createPhoto = (photosIndex) => ({
  id: photosIndex,
  url: `photos/${photosIndex}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

const getPhotos = () => Array.from({length: COUNT_PHOTOS}, (_,photosIndex) => createPhoto(photosIndex + 1));
export { getPhotos };
