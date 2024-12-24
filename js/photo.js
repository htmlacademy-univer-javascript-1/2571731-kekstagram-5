const SUPPORTED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__item .effects__preview');


const onUploadPhotoForm = () => {
  const selectedFile = uploadInput.files[0];
  const fileNameLower = selectedFile.name.toLowerCase();
  const isSupported = SUPPORTED_FILE_TYPES.some((type) => fileNameLower.endsWith(type));

  if (isSupported) {
    imgUploadPreview.src = URL.createObjectURL(selectedFile);

    effectPreviews.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
};

uploadInput.addEventListener('change', onUploadPhotoForm);
