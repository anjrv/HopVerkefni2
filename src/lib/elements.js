import { el } from './helpers';

/**
 * Notað til að búa til þær elements sem koma fram í list
 * á index síðunni.
 *
 * @param {*} object tegund
 */
export function createItem(object) {
  const thumb = el('div');
  thumb.classList.add('lectures__thumbnail');

  if (object.thumbnail) {
    const img = el('img');
    img.setAttribute('src', object.thumbnail);
    img.setAttribute('alt', 'thumbnail');
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
  item.setAttribute('href', `fyrirlestur.html?id=${object.slug}`);

  return item;
}

export function createElement() {
  // get data/type, do stuff
}
