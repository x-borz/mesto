import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__img");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._captionElement.textContent = this._name;
    super.open();
  }

  setImageInfo({name, link}) {
    this._name = name;
    this._link = link;
  }
}
