import FormValidator from '../components/FormValidator.js'
import {
  initialCards,
  validParams,
  profileEditButton,
  newPlaceButton
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: item => cardList.addItem(createCardElement(item))
  },
  '.elements'
);

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormProfile = new PopupWithForm(
  {
    handleFormSubmit: values => userInfo.setUserInfo(values)
  },
  '.popup_type_profile'
);
const popupWithFormNewPlace = new PopupWithForm(
  {
    handleFormSubmit: values => cardList.addItem(createCardElement(values))
  },
  '.popup_type_new-place'
);

const userInfo = new UserInfo('.profile__name', '.profile__job');

const profileFormValidator = new FormValidator(validParams, '.popup__form_type_profile');
const newPlaceFormValidator = new FormValidator(validParams, '.popup__form_type_new-place');

function createCardElement({name, link}) {
  const card = new Card(
    {
      name,
      link,
      handleCardClick: () => {
        popupWithImage.setImageInfo({name, link});
        popupWithImage.open();
      }
    },
    '.card-template'
  );
  return card.generateCard();
}

// загружаем 6 карточек "из коробки"
cardList.renderItems();

// включаем обработку событий в попапах
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();

// включаем валидацию форм
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

// обрабатываем нажатие на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.clearErrors();
  popupWithFormProfile.open();
});

// обрабатываем нажатие на кнопку добавления нового места
newPlaceButton.addEventListener('click', () => {
  newPlaceFormValidator.clearErrors();
  popupWithFormNewPlace.open();
});
