import {openPopup} from "../utils/utils.js";
import {imagePopup, imagePopupImageElement, imagePopupCaptionElement} from '../utils/constants.js'

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
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

  _handleOpenPopup() {
    const cardImage = this._element.querySelector('.element__img');
    imagePopupImageElement.src = cardImage.src;
    imagePopupImageElement.alt = cardImage.alt;
    imagePopupCaptionElement.textContent = cardImage.alt;
    openPopup(imagePopup);
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
      () => this._handleOpenPopup()
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
