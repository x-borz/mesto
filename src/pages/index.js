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
      handleAddLikeClick: () => {
        api.addLike(_id)
          .then(({likes}) => {
            card.addLike(likes.length);
          })
          .catch(err => console.log(err))
      },
      handleRemoveLikeClick: () => {
        api.removeLike(_id)
          .then(({likes}) => {
            card.removeLike(likes.length);
          })
          .catch(err => console.log(err))
      },
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
      api.updateAvatar(link)
        .then(({_id, name, about, avatar}) => {
          userInfo.setUserInfo({userId: _id, name, job: about, link: avatar});
          popupWithFormNewAvatar.close();
        }
      )
      .catch(err => console.log(err))
      .finally(() => popupWithFormNewAvatar.renderBusy(false));
    }
  },
  '.popup_type_new-avatar'
);

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__job',
  '.profile__avatar'
);

const formValidators = {};
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach(formElement => {
    const validator = new FormValidator(validParams, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

// включаем обработку событий в попапах
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithFormNewAvatar.setEventListeners();

// создаем экземпляры класса FormValidator для всех форм и включаем валидацию
enableValidation();

// обрабатываем нажатие на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profile'].resetValidation();
  popupWithFormProfile.open();
});

// обрабатываем нажатие на кнопку добавления нового места
newPlaceButton.addEventListener('click', () => {
  formValidators['new-place'].resetValidation();
  popupWithFormNewPlace.open();
});

// обрабатываем нажатие на кнопку редактирования аватара
avatarUpdateButton.addEventListener('click', () => {
  formValidators['new-avatar'].resetValidation();
  popupWithFormNewAvatar.open();
});

// загружаем информацию о пользователе и карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({userId: userData._id, name: userData.name, job: userData.about, link: userData.avatar})
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err));
