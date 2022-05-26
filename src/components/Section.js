export default class Section {
  constructor({renderer}, cardsListSelector) {
    this._container = document.querySelector(cardsListSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
