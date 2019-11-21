import { empty, el } from './helpers';
import { createItem } from './elements';

export default class List {
  // Frumstilling
  constructor() {
    this.container = document.querySelector('.lectures');
    this.menu = document.querySelectorAll('.menu__button');
    this.url = 'lectures.json';
  }

  /**
   * Sækir gögn úr this.url (lectures.json)
   */
  getData() {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt');
        }
        return response.json();
      });
  }

  /**
   * Býr til lectures item list með því að búa til
   * rows og cols og fylla þær með því að kalla á
   * createItem()
   *
   * @param {*} data Gögn úr url
   */
  createItemList(data) {
    const lectures = document.getElementsByClassName('lectures');

    let lecturesRow = el('div');
    lecturesRow.classList.add('lectures__row');

    data.lectures.forEach((object, index) => {
      if (index % 3 === 0 && index !== 0) {
        lectures[0].appendChild(lecturesRow);
        lecturesRow = el('div');
        lecturesRow.classList.add('lectures__row');
      }
      const lecturesColumn = el('div', createItem(object));
      lecturesColumn.classList.add('lectures__col');
      lecturesRow.appendChild(lecturesColumn);
      if (data.lectures.length % 3 !== 0) lectures[0].appendChild(lecturesRow);
    });
  }

  load() {
    empty(this.container);
    this.getData()
      // TODO:
      // .then((data) => TODO, function to filter lectures according to menu )
      .then((data) => this.createItemList(data))
      .catch((error) => {
        throw new Error(error);
      });
    // TODO, enable listeners
  }
}
