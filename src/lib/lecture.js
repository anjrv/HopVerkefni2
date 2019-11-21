import { createElement } from './elements';

export default class Lecture {
  // Frumstilling
  constructor() {
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
   * Leitar eftir slug gildi í window url
   * Kallar á getData ef það fannst
   * Kallar svo á element constructor fyrir data
   */
  load() {
    const search = new URLSearchParams(window.location.search);
    const slug = search.get('slug');

    if (!slug || slug === '') {
      console.error('Engin fyrirlestur');
      return;
    }

    this.getData(slug)
      .then((data) => {
        createElement(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
