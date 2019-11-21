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

export function createElement(object) {
  // HEADER PORTION
  const page = document.querySelector('body');

  const intro = el('header');
  intro.classList.add('intro');
  if (object.image) {
    intro.style.backgroundImage = `url("/${object.image}")`;
  }

  const protection = el('div');
  protection.classList.add('intro__protection');
  intro.appendChild(protection);

  const course = el('span', object.category);
  course.classList.add('intro__course');
  intro.appendChild(course);

  const title = el('h1', object.title);
  title.classList.add('intro__title');
  intro.appendChild(title);

  page.appendChild(intro);

  // CONTENT PORTION
  const content = el('div');
  object.content.forEach((item) => {
    console.log(item); // eslint-disable-line
    // For each piece of content create element
  });

  page.appendChild(content);

  // FOOTER PORTION
  const footer = el('footer');
  footer.classList.add('outro');

  const finish = el('button', 'Klára fyrirlestur');
  finish.classList.add('outro__button');
  footer.appendChild(finish);

  const back = el('a', 'Til baka');
  back.classList.add('outro__button');
  back.setAttribute('href', 'index.html');
  footer.appendChild(back);

  page.appendChild(footer);
}