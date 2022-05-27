import './index.css';

import FormValidator from '../components/FormValidator.js'
import {
  validParams,
  apiOptions,
  profileEditButton,
  newPlaceButton,
  cardIdPrefix
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api(apiOptions);

const addCard = ({name, link}) => {
  api.addCard(
    {name, link},
    ({_id, name, link, owner, likes}) => {
      const cardId = cardIdPrefix + _id;
      const card = new Card(
        {
          cardId,
          name,
          link,
          handleCardClick: () => popupWithImage.open({name, link}),
          handleDropClick: () => popupWithConfirmation.open({cardId}),
          handleAddLikeClick: handler => api.addLike(_id, handler),
          handleRemoveLikeClick: handler => api.removeLike(_id, handler),
          isDroppable: userInfo.getUserId() === owner._id,
          likesCount: likes.length
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
const popupWithConfirmation = new PopupWithConfirmation(
  {
    handleFormSubmit: ({cardId}) => {
      const id = cardId.replace(cardIdPrefix, '');
      api.dropCard(id, data => {
        let card = document.querySelector('.element#' + cardId);
        card.remove();
        card = null;
      });
    }
  },
  '.popup_type_confirmation'
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
popupWithConfirmation.setEventListeners();

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
api.getUserInfo(({_id, name, about, avatar}) => {
  userInfo.setUserInfo({
    userId: _id,
    name,
    job: about
  });
  userInfo.setAvatar(avatar);
});
