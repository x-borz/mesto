export const validParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'e54fe21d-9764-47c4-b2ad-473d479b0a70'
  }
};

export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const newPlaceButton = document.querySelector('.profile__button_type_add');
