export const initialCards = [
  {
    name: 'Москва',
    link: 'https://unsplash.com/photos/luPZa4Sko_k/download?force=true&amp;w=640'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://unsplash.com/photos/vPWJ-wwZ2D8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8N3x8c3QuJTIwcGV0ZXJzYnVyZ3xlbnwwfHx8fDE2NDc5NjY4MTA&amp;force=true&amp;w=640'
  },
  {
    name: 'Амстердам',
    link: 'https://unsplash.com/photos/2K2SR19RLg8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fGFtc3RlcmRhbXxlbnwwfHx8fDE2NDc5NjY5NDM&amp;force=true&amp;w=640'
  },
  {
    name: 'Шанхай',
    link: 'https://unsplash.com/photos/uKyzXEc2k_s/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8c2hhbmdoYWl8ZW58MHx8fHwxNjQ3OTY1Njc5&amp;force=true&amp;w=640'
  },
  {
    name: 'Тбилиси',
    link: 'https://unsplash.com/photos/cMMbQayO7rE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8dGJpbGlzaXxlbnwwfHx8fDE2NDc5NjY4ODk&amp;force=true&amp;w=640'
  },
  {
    name: 'Венеция',
    link: 'https://unsplash.com/photos/t2yh3mlISdQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8dmVuaWNlfGVufDB8fHx8MTY0Nzk2NzI3Nw&amp;force=true&amp;w=640'
  }
];

export const validParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupImageElement = imagePopup.querySelector(".popup__img");
export const imagePopupCaptionElement = imagePopup.querySelector(".popup__caption");
