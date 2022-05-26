import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
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
      this._handleFormSubmit(this._getInputValues());
      this.close();
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
}
