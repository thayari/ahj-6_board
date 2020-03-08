import Card from './card';

export default class Ui {
  constructor() {
    this.cards = [];
    this.board = document.querySelector('.board');
    this.modal = document.querySelector('.modal');
    this.addtext = document.getElementById('text');
    this.addtextButton = document.getElementById('submit');
    this.todo = document.querySelector('[data-id=todo] .list');
    this.inprogress = document.querySelector('[data-id=inprogress] .list');
    this.done = document.querySelector('[data-id=done] .list');
    this.mouseDown = false;
    this.draggedEl = null;
    this.ghostEl = null;
    this.placeholder = document.createElement('li');
    this.lists = [this.todo, this.inprogress, this.done];
    this.closestCard = null;
    this.latestCard = null;
  }

  dnd() {
    this.board.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('delete')) {
        return;
      }
      if (!event.target.closest('.card')) {
        return;
      }

      this.board.classList.add('grabbing-cursor');

      this.mouseDown = true;
      this.draggedEl = event.target.closest('.card');
      this.ghostEl = event.target.closest('.card').cloneNode(true);
      this.ghostEl.classList.add('dragged');
      document.body.appendChild(this.ghostEl);
      this.ghostEl.style.width = `${this.draggedEl.offsetWidth}px`;
      this.ghostEl.style.height = `${this.draggedEl.offsetHeight}px`;

      // определить первоначальные координаты мыши по отношению к элементу
      this.ghostLeft = event.clientX - this.draggedEl.getBoundingClientRect().x;
      this.ghostTop = event.clientY - this.draggedEl.getBoundingClientRect().y;

      this.ghostEl.style.left = `${this.draggedEl.getBoundingClientRect().x}px`;
      this.ghostEl.style.top = `${this.draggedEl.getBoundingClientRect().y}px`;
      this.draggedEl.style.opacity = '0.5';
    });

    this.board.addEventListener('mousemove', (event) => {
      if (!this.draggedEl) return;
      event.preventDefault();
      this.ghostEl.style.left = `${event.clientX - this.ghostLeft}px`;
      this.ghostEl.style.top = `${event.clientY - this.ghostTop}px`;
    });

    this.board.addEventListener('mouseleave', () => {
      if (!this.draggedEl) return;
      this.removeGhostEl();
    });

    document.addEventListener('mouseover', (event) => {
      if (!this.draggedEl) return;

      // карточка, над которой проносится элемент
      this.closestCard = event.target.closest('.card');
      if (this.closestCard != null) {
        this.latestCard = this.closestCard;
      }

      if (document.elementFromPoint(event.clientX, event.clientY).classList.contains('board')) {
        this.latestCard = null;
      }

      // добавить плейсхолдер
      if (this.latestCard) {
        this.placeholder.classList.add('card-placeholder');
        this.placeholder.style.height = `${this.ghostEl.offsetHeight}px`;

        const halfHeight = this.latestCard.offsetHeight / 2;
        const box = this.latestCard.getBoundingClientRect();
        if (event.clientY <= box.top + halfHeight) {
          this.latestCard.before(this.placeholder);
        } else if (event.clientY > box.top + halfHeight) {
          this.latestCard.after(this.placeholder);
        }
      }

      // если курсор не над карточкой, удалить плейсхолдер
      if (!this.latestCard) {
        this.placeholder.remove();
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (!this.draggedEl) return;
      event.preventDefault();
      this.mouseDown = false;

      // обнаружим новую колонку
      const targetColumn = event.target.closest('.column');
      if (!targetColumn) {
        this.removeGhostEl();
      }

      if (!event.target.closest('.column')) {
        if (this.draggedEl) {
          this.removeGhostEl();
        }
        return;
      }
      this.draggedEl.style.opacity = '1';
      if (!this.draggedEl) {
        return;
      }

      // поменять колонку элемента
      const find = this.cards.filter((card) => card.id === Number(this.draggedEl.dataset.id))[0];
      find.columnType = targetColumn.dataset.id;


      if (this.latestCard) {
        // добавить вместо плейсхолдера
        this.placeholder.insertAdjacentElement('beforebegin', this.draggedEl);
      }

      // добавить в конец столбца
      this.removeGhostEl();
      this.defineOrder();
      this.render();
    });

    this.board.addEventListener('mouseleave', () => {
      this.removeGhostEl();
      this.mouseDown = false;
    });
  }

  removeGhostEl() {
    document.body.removeChild(this.ghostEl);
    this.closestEl = null;
    this.closestCard = null;
    this.ghostEl = null;
    this.draggedEl.style.opacity = 1;
    this.draggedEl = null;
    this.board.classList.remove('grabbing-cursor');
  }

  addEvents() {
    this.board.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('add')) {
        this.modal.classList.remove('hidden');
        this.columnType = event.target.parentNode.dataset.id;
      }
      if (event.target.classList.contains('delete')) {
        const targetCard = event.target.parentNode;
        this.removeCard(targetCard);
      }
    });

    this.addtextButton.addEventListener('click', (event) => {
      event.preventDefault();
      const text = this.addtext.value;
      this.addNewCard(this.columnType, text);
      this.columnType = null;
      this.addtext.value = '';
      this.modal.classList.add('hidden');
    });

    document.getElementById('cancel').addEventListener('click', () => {
      this.modal.classList.add('hidden');
    });
  }

  addNewCard(columnType, text) {
    const card = new Card(columnType, text, Math.floor(Math.random() * 10000000));
    this.cards.push(card);
    this.render();
  }

  removeCard(card) {
    const find = this.cards.filter((item) => item.id === Number(card.dataset.id))[0];
    this.cards.splice(this.cards.indexOf(find), 1);
    this.render();
  }

  defineOrder() {
    this.lists.forEach((list) => {
      const listItems = Array.from(list.childNodes);
      for (let i = 0; i < listItems.length; i += 1) {
        listItems[i].dataset.order = i;
      }
    });
    this.cards.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.order = document.querySelector(`[data-id="${item.id}"]`).dataset.order;
    });
  }


  render() {
    this.cards.sort((a, b) => Number(a.order) - Number(b.order));
    this.save();
    this.todo.innerHTML = '';
    this.done.innerHTML = '';
    this.inprogress.innerHTML = '';
    this.cards.forEach((item) => {
      if (item.columnType === 'todo') {
        this.todo.insertAdjacentHTML('beforeend', item.html);
      } else if (item.columnType === 'done') {
        this.done.insertAdjacentHTML('beforeend', item.html);
      } else if (item.columnType === 'inprogress') {
        this.inprogress.insertAdjacentHTML('beforeend', item.html);
      }
    });
    this.defineOrder();
  }

  start() {
    if (localStorage.todolist) {
      this.cards = JSON.parse(localStorage.todolist);
      this.render();
    }
    this.addEvents();
    this.dnd();
  }

  save() {
    localStorage.todolist = JSON.stringify(this.cards);
  }
}
