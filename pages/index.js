import FormValidator from '../components/FormValidator.js'
import {initialCards, validParams} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";

const profileFormElement = document.querySelector(".popup__form_type_profile");
// const profileNameInput = profileFormElement.querySelector(".popup__input_el_profile-name");
// const profileJobInput = profileFormElement.querySelector(".popup__input_el_profile-job");
// const profileEditButton = document.querySelector('.profile__button_type_edit');
// const profileNameElement = document.querySelector('.profile__name');
// const profileJobElement = document.querySelector('.profile__job');

const newPlaceFormElement = document.querySelector(".popup__form_type_new-place");
// const newPlaceNameInput = newPlaceFormElement.querySelector(".popup__input_el_place-name");
// const newPlaceImageLinkInput = newPlaceFormElement.querySelector(".popup__input_el_image-link");
const newPlaceButton = document.querySelector('.profile__button_type_add');

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => cardList.addItem(createCardElement(item))
  },
  '.elements'
);

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormProfile = new PopupWithForm(
  {
    handleFormSubmit: values => {

    }
  },
  '.popup_type_profile'
);
const popupWithFormNewPlace = new PopupWithForm(
  {
    handleFormSubmit: values => cardList.addItem(createCardElement(values))
  },
  '.popup_type_new-place'
);

const profileFormValidator = new FormValidator(validParams, profileFormElement);
const newPlaceFormValidator = new FormValidator(validParams, newPlaceFormElement);

function createCardElement({name, link}) {
  const card = new Card(
    {
      name,
      link,
      handleCardClick: (imageInfo) => {
        popupWithImage.setImageInfo(imageInfo);
        popupWithImage.open();
      }
    },
    '.card-template'
  );
  return card.generateCard();
}

//1. Загружаем 6 карточек "из коробки"
cardList.renderItems();

popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();

// //2. Манипуляции с попапом редактирования профиля
// profileEditButton.addEventListener('click', () => {
//   profileNameInput.value = profileNameElement.textContent;
//   profileJobInput.value = profileJobElement.textContent;
//   profileFormValidator.clearErrors();
//   openPopup(profilePopup);
// });
//
// profileFormElement.addEventListener('submit', evt => {
//   evt.preventDefault();
//   profileNameElement.textContent = profileNameInput.value;
//   profileJobElement.textContent = profileJobInput.value;
//   closePopup(profilePopup);
// });

//3. Манипуляции с попапом добавления нового места
  newPlaceButton.addEventListener('click', () => {
    newPlaceFormValidator.clearErrors();
    popupWithFormNewPlace.open();
  });

// newPlaceFormElement.addEventListener('submit', evt => {
//   evt.preventDefault();
//   cardList.addItem(createCardElement(newPlaceNameInput.value, newPlaceImageLinkInput.value));
//   closePopup(newPlacePopup);
// });


//включаем валидацию форм
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
