import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
    this.menu = document.querySelectorAll('.selection__button');
    this.url = 'lectures.json';
  }

  getData() {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return response.json();
      });
  }

  createItem(object) {
    const image = el('div');
    image.classList.add('lecture__image');

    if (object.thumbnail) {
      const img = el('img');
      img.setAttribute('src', object.thumbnail);
      img.setAttribute('alt', '');
      image.appendChild(img);
    }

    const category = el('span', object.category);
    category.classList.add('lecture__category');

    const heading = el('h2', object.title);
    heading.classList.add('lecture__title');

    const textElements = el('div', category, heading);
    textElements.classList.add('lecture__texts');

    const text = el('div', textElements);
    text.classList.add('lecture__contents');

    const item = el('a', image, text);
    item.classList.add('lecture__button');
    item.setAttribute('href', `fyrirlestur.html?slug=${object.slug}`);

    return item;
  }

  createItemList(data) {
    const myData = Object.keys(data).map((key) => data[key]);
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
      // .then((data) => TODO, function to filter lectures )
      // .then((data) => TODO, function to show selected lectures )
      .catch((error) => {
        throw new Error(error);
      });
    // TODO, enable menu button listeners
  }
}
