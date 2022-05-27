export default class Card {
  constructor({cardId, name, link, handleCardClick, handleDropClick, isDroppable}, templateSelector) {
    this._cardId = cardId;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDropClick = handleDropClick;
    this._templateSelector = templateSelector;
    this._isDroppable = isDroppable;
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

    this._element.id = this._cardId;

    this._element.querySelector('.element__title').textContent = this._name;

    const cardImage = this._element.querySelector('.element__img');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    if (!this._isDroppable) {
      this._element.querySelector('.element__drop-button').classList.add('element__drop-button_hidden');
    }

    return this._element;
  }
}
