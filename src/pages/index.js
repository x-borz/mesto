import './index.css';

import {
  validParams,
  apiOptions,
  profileEditButton,
  newPlaceButton,
  avatarUpdateButton,
  cardIdPrefix
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js'
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api(apiOptions);

const renderCardElement = ({_id, name, link, owner, likes}) => {
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
      likesCount: likes.length,
      isLiked: likes.some(like => {
        return userInfo.getUserId() === like._id;
      })
    },
    '.card-template'
  );

  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}

const cardList = new Section(
  {
    renderer: renderCardElement
  },
  '.elements'
);

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormProfile = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => {
      api.updateUserInfo({name, about: job})
        .then(({_id, name, about, avatar}) => {
          userInfo.setUserInfo({userId: _id, name, job: about, link: avatar});
          popupWithFormProfile.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupWithFormProfile.renderBusy(false));
    }
  },
  '.popup_type_profile'
);
const popupWithFormNewPlace = new PopupWithForm(
  {
    handleFormSubmit: item => {
      api.addCard(item)
        .then(data => {
            renderCardElement(data);
            popupWithFormNewPlace.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupWithFormNewPlace.renderBusy(false));
    }
  },
  '.popup_type_new-place'
);
const popupWithConfirmation = new PopupWithConfirmation(
  {
    handleConfirmClick: ({cardId}) => {
      const id = cardId.replace(cardIdPrefix, '');
      api.dropCard(id)
        .then(data => {
          let card = document.querySelector('.element#' + cardId);
          card.remove();
          card = null;
          popupWithConfirmation.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupWithConfirmation.renderBusy(false));
    }
  },
  '.popup_type_confirmation'
);
const popupWithFormNewAvatar = new PopupWithForm(
  {
    handleFormSubmit: ({link}) => {
      return api.updateAvatar(
        link,
        ({_id, name, about, avatar}) => userInfo.setUserInfo({userId: _id, name, job: about, link: avatar})
      )
    }
  },
  '.popup_type_new-avatar'
);

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__job',
  '.profile__avatar'
);

const profileFormValidator = new FormValidator(validParams, '.popup__form_type_profile');
const newPlaceFormValidator = new FormValidator(validParams, '.popup__form_type_new-place');
const newAvatarFormValidator = new FormValidator(validParams, '.popup__form_type_new-avatar');

// включаем обработку событий в попапах
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithFormNewAvatar.setEventListeners();

// включаем валидацию форм
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();

// обрабатываем нажатие на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
  popupWithFormProfile.open();
});

// обрабатываем нажатие на кнопку добавления нового места
newPlaceButton.addEventListener('click', () => {
  newPlaceFormValidator.resetValidation();
  popupWithFormNewPlace.open();
});

// обрабатываем нажатие на кнопку редактирования аватара
avatarUpdateButton.addEventListener('click', () => {
  newAvatarFormValidator.resetValidation();
  popupWithFormNewAvatar.open();
});

// загружаем информацию о пользователе и карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({userId: userData._id, name: userData.name, job: userData.about, link: userData.avatar})
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err));
