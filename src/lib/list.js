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

  // TODO parse information to html elements
  /* createComponent(data) {

  } */

  createLecture(data) {
    // Console example of Object json
    console.log(data);
  }

  load() {
    empty(this.container);
    this.getData()
      .then((data) => this.createLecture(data))
      // TODO:
      // .then((data) => TODO, function to filter lectures )
      // .then((data) => TODO, function to show selected lectures )
      .catch((error) => {
        throw new Error(error);
      });
    // TODO, enable menu button listeners
  }
}
