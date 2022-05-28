import './index.css';

import FormValidator from '../components/FormValidator.js'
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
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api(apiOptions);

const addCard = ({name, link}) => {
  return api.addCard(
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
    handleFormSubmit: ({name, job}) => {
      return api.updateUserInfo({
          name,
          about: job
        },
        ({name, about}) => userInfo.setUserInfo(({name, job: about}))
      )
    }
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
    handleConfirmClick: ({cardId}) => {
      const id = cardId.replace(cardIdPrefix, '');
      return api.dropCard(id, data => {
        let card = document.querySelector('.element#' + cardId);
        card.remove();
        card = null;
      });
    }
  },
  '.popup_type_confirmation'
);
const popupWithFormNewAvatar = new PopupWithForm(
  {
    handleFormSubmit: ({link}) => {
      return api.updateAvatar(link, data => userInfo.setAvatar(data.avatar))
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
  profileFormValidator.clearErrors();
  popupWithFormProfile.open();
});

// обрабатываем нажатие на кнопку добавления нового места
newPlaceButton.addEventListener('click', () => {
  newPlaceFormValidator.clearErrors();
  popupWithFormNewPlace.open();
});

// обрабатываем нажатие на кнопку редактирования аватара
avatarUpdateButton.addEventListener('click', () => {
  newAvatarFormValidator.clearErrors();
  popupWithFormNewAvatar.open();
});

// загружаем информацию о пользователе с сервера
api.getUserInfo(({_id, name, about, avatar}) => {
  userInfo.setUserInfo({
    name,
    job: about
  });
  userInfo.setUserId(_id)
  userInfo.setAvatar(avatar);

  // загружаем начальные карточки
  api.getInitialCards(data => cardList.renderItems(data));
});
