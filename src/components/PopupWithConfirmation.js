import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}
