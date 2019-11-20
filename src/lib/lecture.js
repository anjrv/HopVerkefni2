import { el } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json';
  }

  getData(slug) {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt');
        }
        return response.json();
      })
      .then((data) => {
        const result = data.lectures.find((object) => object.slug === slug);
        if (!result) {
          throw new Error('Ekki til');
        }
        return result;
      });
  }

  load() {
    const search = new URLSearchParams(window.location.search);
    const slug = search.get('slug');

    if (!slug || slug === '') {
      console.error('Engin fyrirlestur');
      return;
    }

    this.getData(slug)
      .then((data) => {
        console.log(data); // eslint-disable-line

        // TODO búa til öll elements fyrir fyrirlestur
        // Til að sjá hvort það er ekki endilega að velja rétt
        const category = el('span', data.category);
        category.style.fontSize = 'xx-large';
        this.container.appendChild(category);
        const heading = el('h2', data.title);
        heading.style.fontSize = 'xx-large';
        this.container.appendChild(heading);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
