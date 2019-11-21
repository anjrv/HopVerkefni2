import { createElement } from './elements';

export default class Lecture {
  // Frumstilling
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json';
  }

  /**
   * Sækir gögn með réttan slug identification
   * @param {} id slug key
   */
  getData(id) {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt');
        }
        return response.json();
      })
      .then((data) => {
        const result = data.lectures.find((object) => object.slug === id);
        if (!result) {
          throw new Error('Ekki til');
        }
        return result;
      });
  }

  /**
   * Leitar eftir id gildi í window url
   * Kallar á getData með urlið ef það fannst
   * Kallar svo á element constructor fyrir data
   */
  load() {
    const search = new URLSearchParams(window.location.search);
    const id = search.get('id');

    if (!id || id === '') {
      console.error('Engin fyrirlestur');
      return;
    }

    this.getData(id)
      .then((data) => {
        console.log(data); // eslint-disable-line
        createElement(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
