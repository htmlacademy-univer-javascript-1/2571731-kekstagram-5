const HTTPS = {
  'GET':'https://29.javascript.htmlacademy.pro/kekstagram/data',
  'POST':'https://29.javascript.htmlacademy.pro/kekstagram1'
};


function createErrorDiv(error) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('data-error');
  errorDiv.style.color = 'red';
  errorDiv.style.fontWeight = 'bold';
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = 'white';
  errorDiv.style.borderBottom = '2px solid red';
  errorDiv.style.zIndex = '1000';
  errorDiv.innerText = `Упс, ошибка со стороны сервера, попробуйте перезагрузить страницу или зайти попозже :( ${error}`;
  errorDiv.style.textAlign = 'center';
  document.body.appendChild(errorDiv);
}


function fentchData(method,onSuccess, onError = createErrorDiv, formData){
  fetch(
    HTTPS[method],
    {
      method:method,
      body: formData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((result)=>{
      onSuccess(result);
    })
    .catch((error)=>{
      onError(error);
    });
}

export { fentchData };
