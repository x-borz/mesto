import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton.textContent += '...';
      this._handleFormSubmit(this._data)
        .finally(() => {
          this._submitButton.textContent = this._submitButton.textContent.slice(0, -3);
          this.close();
      });
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
