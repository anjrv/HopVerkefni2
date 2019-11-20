import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
    this.menu = document.querySelectorAll('.menu__button');
    this.url = 'lectures.json';
  }

  getData() {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt');
        }
        return response.json();
      });
  }

  createItem(object) {
    const thumb = el('div');
    thumb.classList.add('lectures__thumbnail');

    if (object.thumbnail) {
      const img = el('img');
      img.setAttribute('src', object.thumbnail);
      img.setAttribute('alt', '');
      thumb.appendChild(img);
    } else {
      thumb.classList.add('lectures__thumbnail--none');
    }

    const category = el('span', object.category);
    category.classList.add('lectures__category');

    const heading = el('h2', object.title);
    heading.classList.add('lectures__title');

    const texts = el('div', category, heading);
    texts.classList.add('lectures__texts');

    const text = el('div', texts);
    text.classList.add('lectures__contents');

    const item = el('a', thumb, text);
    item.classList.add('lectures__button');
    item.setAttribute('href', `fyrirlestur.html?slug=${object.slug}`);

    return item;
  }

  createItemList(data) {
    const myData = Object.values(data);
    const lectures = document.getElementsByClassName('lectures');

    let lecturesRow = el('div');
    lecturesRow.classList.add('lectures__row');

    myData[0].forEach((object, index) => {
      if (index % 3 === 0 && index !== 0) {
        lectures[0].appendChild(lecturesRow);
        lecturesRow = el('div');
        lecturesRow.classList.add('lectures__row');
      }
      const lecturesColumn = el('div', this.createItem(object));
      lecturesColumn.classList.add('lectures__col');
      lecturesRow.appendChild(lecturesColumn);
      if (myData[0].length % 3 !== 0) lectures[0].appendChild(lecturesRow);
    });
  }

  load() {
    empty(this.container);
    this.getData()
      .then((data) => this.createItemList(data))
      // TODO:
      // .then((data) => TODO, function to filter lectures according to menu )
      .catch((error) => {
        throw new Error(error);
      });
    // TODO, enable menu button listeners
  }
}
