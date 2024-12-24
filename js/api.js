const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = (onLoad, onFail) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(onLoad)
    .catch(onFail);
};

const sendData = (onLoad, onFail, body) => {
  fetch(BASE_URL, {
    method: 'POST',
    body: body,
  })
    .then(onLoad)
    .catch(onFail);
};

export {getData, sendData};
