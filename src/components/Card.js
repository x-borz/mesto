export default class Card {
  constructor(
    {
      cardId,
      name,
      link,
      handleCardClick,
      handleDropClick,
      handleAddLikeClick,
      handleRemoveLikeClick,
      isDroppable,
      likesCount,
      isLiked
    },
    templateSelector)
  {
    this._cardId = cardId;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDropClick = handleDropClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
    this._templateSelector = templateSelector;
    this._isDroppable = isDroppable;
    this._likesCount = likesCount;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _handleLikeClick() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._handleRemoveLikeClick();
    } else {
      this._handleAddLikeClick();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener(
      'click',
      () => this._handleLikeClick()
    );

    this._dropButton.addEventListener(
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

    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._dropButton = this._element.querySelector('.element__drop-button');
    this._cardImage = this._element.querySelector('.element__img');

    this._setEventListeners();

    this._element.id = this._cardId;

    this._element.querySelector('.element__title').textContent = this._name;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (!this._isDroppable) {
      this._dropButton.classList.add('element__drop-button_hidden');
    }

    this._setLikesCount(this._likesCount);

    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    }

    return this._element;
  }

  removeLike(likesCount) {
    this._likeButton.classList.remove('element__like-button_active');
    this._setLikesCount(likesCount);
  }

  addLike(likesCount) {
    this._likeButton.classList.add('element__like-button_active');
    this._setLikesCount(likesCount);
  }

  _setLikesCount(likesCount) {
    this._likeCounter.textContent = likesCount;
  }
}
