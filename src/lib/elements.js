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

  const category = el('p', object.category);
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

/**
 * Create the correct element based on content type
 * @param {*} item item to use
 */
function createContent(item, parent) {
  const typeOfContent = item.type;
  const content = parent;
  let cont;
  let container;

  switch (typeOfContent) {
    default:
      console.error('No content');
      break;
    case 'youtube':
      container = document.createElement('div');
      container.classList.add('lecture__video-container');
      container.style.position = 'relative';
      container.style.width = '100%';
      container.style.paddingBottom = '56.25%';
      container.style.overflow = 'hidden';

      cont = document.createElement('iframe');
      cont.classList.add('lecture__video');
      cont.style.frameborder = '0';
      cont.style.allowfullscreen = '0';
      cont.style.position = 'absolute';
      cont.style.top = '0';
      cont.style.left = '0';
      cont.style.width = '100%';
      cont.style.height = '100%';
      cont.src = item.data;

      container.appendChild(cont);
      content.appendChild(container);
      break;
    case 'text':
      container = item.data.split('\n');
      container.forEach((txt) => {
        cont = el('p', txt);
        cont.classList.add('lecture__text');
        content.appendChild(cont);
      });
      break;
    case 'image':
      container = document.createElement('div');
      container.classList.add('lecture__image-container');

      cont = document.createElement('img');
      cont.classList.add('lecture__image');
      cont.src = item.data;
      cont.alt = item.caption;
      container.appendChild(cont);

      if (item.caption) {
        cont = el('p', item.caption);
        cont.classList.add('lecture__image-caption');
        container.appendChild(cont);
      }
      content.appendChild(container);
      break;
    case 'quote':
      container = document.createElement('div');
      container.classList.add('lecture__quote-container');

      cont = el('p', item.data);
      cont.classList.add('quote__text');
      container.appendChild(cont);

      cont = el('p', item.attribute);
      cont.classList.add('quote__author');
      container.appendChild(cont);

      content.appendChild(container);
      break;
    case 'heading':
      cont = el('h3', item.data);
      cont.classList.add('lecture__heading');

      content.appendChild(cont);
      break;
    case 'code':
      cont = el('pre', item.data);
      cont.classList.add('lecture__code');

      content.appendChild(cont);
      break;
    case 'list':
      container = document.createElement('ul');
      container.classList.add('lecture__list');
      item.data.forEach((text) => {
        cont = el('li', text);
        cont.classList.add('lecture__list-item');
        container.appendChild(cont);
      });
      content.appendChild(container);
      break;
  }
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

  const course = el('p', object.category);
  course.classList.add('intro__course');
  intro.appendChild(course);

  const title = el('h1', object.title);
  title.classList.add('intro__title');
  intro.appendChild(title);

  page.prepend(intro);

  // CONTENT PORTION
  const section = document.querySelector('.lecture');
  object.content.forEach((item) => {
    createContent(item, section);
  });

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
