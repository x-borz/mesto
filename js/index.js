let popup = document.querySelector('.popup');
let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_el_name");
let jobInput = formElement.querySelector(".popup__input_el_job");

let profileEditButton = document.querySelector('.profile__button_type_edit');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__job');

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
