export default class Section {
  constructor({renderer}, cardsListSelector) {
    this._container = document.querySelector(cardsListSelector);
    this._renderer = renderer;
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
