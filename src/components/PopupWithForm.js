import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
    this._submitButtonName = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this.renderBusy(true);
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setInputValues(values) {
    for (const key in values) {
      const input = this._formElement.querySelector('.popup__input[name=' + key + ']');
      input.value = values[key];
    }
  }

  renderBusy(isBusy) {
    if (isBusy) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonName;
    }
  }
}
