//0. Применяемые функции
function createCardElement(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;

  const cardImage = cardElement.querySelector('.element__img');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    imagePopupImageElement.src = cardImage.src;
    imagePopupImageElement.alt = cardImage.alt;
    imagePopupCaptionElement.textContent = cardImage.alt;
    openPopup(imagePopup);
  });

  cardElement.querySelector('.element__like-button').addEventListener(
    'click',
    evt => evt.target.classList.toggle('element__like-button_active')
  );

  cardElement.querySelector('.element__drop-button').addEventListener(
    'click',
    evt => evt.target.parentNode.remove()
  );

  return cardElement;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//1. Загрузка 6 карточек
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

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

initialCards.forEach(item => cardsList.append(createCardElement(item.name, item.link)));

//2. Манипуляции с попапом редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileFormElement = profilePopup.querySelector(".popup__form");
const profileNameInput = profileFormElement.querySelector(".popup__input_el_profile-name");
const profileJobInput = profileFormElement.querySelector(".popup__input_el_profile-job");
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  openPopup(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

profileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(profilePopup);
});

//3. Манипуляции с попапом добавления нового места
const newPlacePopup = document.querySelector('.popup_type_new-place');
const newPlaceFormElement = newPlacePopup.querySelector(".popup__form");
const newPlaceNameInput = newPlaceFormElement.querySelector(".popup__input_el_place-name");
const newPlaceImageLinkInput = newPlaceFormElement.querySelector(".popup__input_el_image-link");
const newPlacePopupCloseButton = newPlacePopup.querySelector(".popup__close-button");
const newPlaceButton = document.querySelector('.profile__button_type_add');

newPlaceButton.addEventListener('click', () => {
  newPlaceNameInput.value = '';
  newPlaceImageLinkInput.value = '';
  openPopup(newPlacePopup);
});

newPlacePopupCloseButton.addEventListener('click', () => closePopup(newPlacePopup));

newPlaceFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  cardsList.prepend(createCardElement(newPlaceNameInput.value, newPlaceImageLinkInput.value));
  closePopup(newPlacePopup);
});

//4. Манипуляции с попапом для показа изображения
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const imagePopupImageElement = imagePopup.querySelector(".popup__img");
const imagePopupCaptionElement = imagePopup.querySelector(".popup__caption");

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
