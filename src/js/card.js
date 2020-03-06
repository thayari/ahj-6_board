export default class Card {
  constructor(columnType, text, id) {
    this.columnType = columnType;
    this.text = text;
    this.id = id;
    this.html = this.setCardHtml();
    this.order = null;
  }

  setCardHtml() {
    return `<li class="card" data-id=${this.id}>
    <div class="card-text">${this.text}</div>
    <button class="delete">×</delete>
    </li>`;
  }
}
