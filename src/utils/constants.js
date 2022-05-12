export const initialCards = [
  {
    name: 'Москва',
    link: 'https://unsplash.com/photos/luPZa4Sko_k/download?force=true&w=640'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://unsplash.com/photos/vPWJ-wwZ2D8/download?force=true&w=640'
  },
  {
    name: 'Амстердам',
    link: 'https://unsplash.com/photos/2K2SR19RLg8/download?force=true&w=640'
  },
  {
    name: 'Шанхай',
    link: 'https://unsplash.com/photos/uKyzXEc2k_s/download?force=true&w=640'
  },
  {
    name: 'Тбилиси',
    link: 'https://unsplash.com/photos/cMMbQayO7rE/download?force=true&w=640'
  },
  {
    name: 'Венеция',
    link: 'https://unsplash.com/photos/t2yh3mlISdQ/download?force=true&w=640'
  }
];

export const validParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const newPlaceButton = document.querySelector('.profile__button_type_add');
