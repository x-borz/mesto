import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleConfirmClick}, popupSelector) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
    this._confirmButtonName = this._confirmButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', evt => {
      evt.preventDefault();
      this.renderBusy(true);
      this._handleConfirmClick(this._data);
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }

  renderBusy(isBusy) {
    if (isBusy) {
      this._confirmButton.textContent = 'Сохранение...';
    } else {
      this._confirmButton.textContent = this._confirmButtonName;
    }
  }
}
