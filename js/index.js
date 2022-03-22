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

const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

initialCards.forEach(item => cardsList.append(createCardElement(item.name, item.link)));

function createCardElement(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__img');
  cardImage.src = link;
  cardImage.alt = name;
  return cardElement;
}

const popup = document.querySelector('.popup');
const formElement = popup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_el_name");
const jobInput = formElement.querySelector(".popup__input_el_job");

const profileEditButton = document.querySelector('.profile__button_type_edit');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
