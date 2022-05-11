export default class Card {
  constructor({name, link, handleCardClick}, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDropClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener(
      'click',
      () => this._handleLikeClick()
    );

    this._element.querySelector('.element__drop-button').addEventListener(
      'click',
      () => this._handleDropClick()
    );

    this._element.querySelector('.element__img').addEventListener(
      'click',
      () => this._handleCardClick()
    );
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;

    const cardImage = this._element.querySelector('.element__img');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }
}
