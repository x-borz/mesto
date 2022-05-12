export default class Section {
  constructor({items, renderer}, cardsListSelector) {
    this._container = document.querySelector(cardsListSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.reverse().forEach(item => this._renderer(item));
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
