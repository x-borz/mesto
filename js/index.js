import Card from "./Card.js";
import FormValidator from './FormValidator.js'
import {openPopup, closePopup} from "./utils.js";
import {initialCards, validParams} from "./constants.js";

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

function createCardElement(name, link) {
  const card = new Card(name, link, '.card-template');
  return card.generateCard();
}

//1. Загружаем 6 карточек "из коробки"
initialCards.forEach(item => cardsList.append(createCardElement(item.name, item.link)));

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
  cardsList.prepend(createCardElement(newPlaceNameInput.value, newPlaceImageLinkInput.value));
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
