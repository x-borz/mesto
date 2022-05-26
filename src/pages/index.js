import './index.css';

import FormValidator from '../components/FormValidator.js'
import {
  validParams,
  apiOptions,
  profileEditButton,
  newPlaceButton
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api(apiOptions);

const addCard = ({name, link}) => {
  api.addCard(
    {name, link},
    ({name, link}) => {
      const card = new Card(
        {
          name,
          link,
          handleCardClick: () => {
            popupWithImage.open({name, link});
          }
        },
        '.card-template'
      );

      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    }
  );
}

const cardList = new Section(
  {
    renderer: addCard
  },
  '.elements'
);

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormProfile = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => api.updateUserInfo({
        name,
        about: job
      },
      ({name, about}) => userInfo.setUserInfo(({name, job: about}))
    )
  },
  '.popup_type_profile'
);
const popupWithFormNewPlace = new PopupWithForm(
  {
    handleFormSubmit: addCard
  },
  '.popup_type_new-place'
);

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__job',
  '.profile__avatar'
);

const profileFormValidator = new FormValidator(validParams, '.popup__form_type_profile');
const newPlaceFormValidator = new FormValidator(validParams, '.popup__form_type_new-place');

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

// загружаем начальные карточки
api.getInitialCards(data => cardList.renderItems(data));

// загружаем информацию о пользователе с сервера
api.getUserInfo(({name, about, avatar}) => {
  userInfo.setUserInfo({
    name,
    job: about
  });
  userInfo.setAvatar(avatar);
});
