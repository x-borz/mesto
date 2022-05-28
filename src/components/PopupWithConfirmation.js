import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleConfirmClick}, popupSelector) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', evt => {
      evt.preventDefault();
      this._confirmButton.textContent += '...';
      this._handleConfirmClick(this._data)
        .finally(() => {
          this._confirmButton.textContent = this._confirmButton.textContent.slice(0, -3);
          this.close();
      });
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
