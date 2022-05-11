export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      this.closePopup(popup);
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    });
  }
}
