import Card from "./Card.js";
import FormValidator from './FormValidator.js'

//объявление констант/переменных
const initialCards = [
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

const validParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardsList = document.querySelector('.elements');

const profilePopup = document.querySelector('.popup_type_profile');
const profileFormElement = profilePopup.querySelector(".popup__form");
const profileNameInput = profileFormElement.querySelector(".popup__input_el_profile-name");
const profileJobInput = profileFormElement.querySelector(".popup__input_el_profile-job");
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const newPlacePopup = document.querySelector('.popup_type_new-place');
const newPlaceFormElement = newPlacePopup.querySelector(".popup__form");
const newPlaceNameInput = newPlaceFormElement.querySelector(".popup__input_el_place-name");
const newPlaceImageLinkInput = newPlaceFormElement.querySelector(".popup__input_el_image-link");
const newPlaceButton = document.querySelector('.profile__button_type_add');

const popups = Array.from(document.querySelectorAll('.popup'));

const profileFormValidator = new FormValidator(validParams, profileFormElement);
const newPlaceFormValidator = new FormValidator(validParams, newPlaceFormElement);

//0. Применяемые функции
function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeHandler);
}

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeHandler);
}

//1. Загружаем 6 карточек "из коробки"
initialCards.forEach(item => {
  const card = new Card(item.name, item.link, '.card-template');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

//2. Манипуляции с попапом редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  profileFormValidator.clearErrors();
  openPopup(profilePopup);
});

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(profilePopup);
});

//3. Манипуляции с попапом добавления нового места
newPlaceButton.addEventListener('click', () => {
  newPlaceNameInput.value = '';
  newPlaceImageLinkInput.value = '';
  newPlaceFormValidator.clearErrors();
  openPopup(newPlacePopup);
});

newPlaceFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  const card = new Card(newPlaceNameInput.value, newPlaceImageLinkInput.value, '.card-template');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
  closePopup(newPlacePopup);
});

//4. Закрытие попапов по клику на темный фон/крестик
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

//включаем валидацию форм
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
