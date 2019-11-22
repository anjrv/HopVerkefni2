import { empty, el } from './helpers';
import { createItem } from './elements';
import { loadLectures, toggleFilter, loadFilters } from './storage';

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
  * Skoðar filters og eyðir út úr data það sem
  * á ekki sjást.
  *
  * @param {*} data Gögn
  */
  filterItemList(data) {
    const filters = loadFilters();
    const lectureArray = data;
    let filterIndex;

    // Byrja í aftasta stak, annars mun splice brjóta for loopið
    for (let i = lectureArray.lectures.length - 1; i >= 0; i -= 1) {
      filterIndex = filters.indexOf(lectureArray.lectures[i].category);
      if (filters.length !== 0 && filterIndex < 0) {
        lectureArray.lectures.splice(i, 1);
      }
    }
    return lectureArray;
  }

  /**
   * Býr til lectures item list með því að búa til
   * rows og cols og fylla þær með því að kalla á
   * createItem()
   *
   * @param {*} data Gögn
   */
  createItemList(data) {
    const lectures = document.getElementsByClassName('lectures');
    const completed = loadLectures();
    let slugIndex;
    let slug;

    let lecturesRow = el('div');
    lecturesRow.classList.add('lectures__row');

    for (let i = 1; i <= data.lectures.length; i += 1) {
      slug = data.lectures[i - 1].slug;

      const lecturesColumn = el('div', createItem(data.lectures[i - 1]));
      slugIndex = completed.indexOf(slug);
      lecturesColumn.classList.add('lectures__col');

      if (slugIndex > -1) {
        lecturesColumn.classList.toggle('lectures__col--completed');
      }
      lecturesRow.appendChild(lecturesColumn);

      if (i % 3 === 0) {
        lectures[0].appendChild(lecturesRow);
        lecturesRow = el('div');
        lecturesRow.classList.add('lectures__row');
      }

      if (data.lectures.length % 3 !== 0) {
        lectures[0].appendChild(lecturesRow);
      }
    }

    // Endurstillir Y scroll position
    const scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
  }

  /**
   * Upphafsstillir menu takkar
   */
  enableMenu() {
    const filterState = loadFilters();
    let slugIndex;

    const htmlButton = document.getElementById('htmlButton');
    slugIndex = filterState.indexOf('html');

    if (slugIndex > -1) {
      htmlButton.classList.toggle('menu__button--active');
    }

    htmlButton.addEventListener('click', () => {
      htmlButton.classList.toggle('menu__button--active');
      localStorage.setItem('scrollpos', window.scrollY);

      toggleFilter('html');
      empty(this.container);
      this.getData()
        .then((data) => this.filterItemList(data))
        .then((data) => this.createItemList(data))
        .catch((error) => {
          throw new Error(error);
        });
    });

    const cssButton = document.getElementById('cssButton');
    slugIndex = filterState.indexOf('css');

    if (slugIndex > -1) {
      cssButton.classList.toggle('menu__button--active');
    }

    cssButton.addEventListener('click', () => {
      cssButton.classList.toggle('menu__button--active');
      localStorage.setItem('scrollpos', window.scrollY);

      toggleFilter('css');
      empty(this.container);
      this.getData()
        .then((data) => this.filterItemList(data))
        .then((data) => this.createItemList(data))
        .catch((error) => {
          throw new Error(error);
        });
    });

    const jsButton = document.getElementById('jsButton');
    slugIndex = filterState.indexOf('javascript');

    if (slugIndex > -1) {
      jsButton.classList.toggle('menu__button--active');
    }

    jsButton.addEventListener('click', () => {
      jsButton.classList.toggle('menu__button--active');
      localStorage.setItem('scrollpos', window.scrollY);

      toggleFilter('javascript');
      empty(this.container);
      this.getData()
        .then((data) => this.filterItemList(data))
        .then((data) => this.createItemList(data))
        .catch((error) => {
          throw new Error(error);
        });
    });
  }

  /**
   * Kallað þegar verið er að hlaða lectures list
   * Fær JSON data og kallar á föllin til að búa til index siðunna
   */
  load() {
    empty(this.container);
    this.getData()
      .then((data) => this.filterItemList(data))
      .then((data) => this.createItemList(data))
      .catch((error) => {
        throw new Error(error);
      });
    this.enableMenu();
  }
}
