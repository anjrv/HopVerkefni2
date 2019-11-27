import { el } from './helpers';
import { completeLecture, loadLectures } from './storage';

/**
 * Notað til að búa til þær elements sem koma fram í list
 * á index síðunni
 *
 * @param {*} object tegund
 */
export function createItem(object) {
  const completed = loadLectures();
  const slugIndex = completed.indexOf(object.slug);

  const thumb = el('div');
  thumb.classList.add('lectures__thumbnail');

  if (object.thumbnail) {
    const img = el('img');
    img.setAttribute('src', object.thumbnail);
    img.setAttribute('alt', 'thumbnail');
    img.classList.add('lectures__thumbnail-img');
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

  if (slugIndex > -1) {
    const tick = el('div', '✓');
    tick.classList.add('lectures__completed');
    text.appendChild(tick);
  }

  const item = el('a', thumb, text);
  item.classList.add('lectures__button');
  item.setAttribute('href', `fyrirlestur.html?slug=${object.slug}`);

  return item;
}

/**
 * Notar switch til að búa til réttan element eftir tegund
 *
 * @param {*} item item object sem er notað fyrir upplýsingar
 * @param {*} parent foreldri þess elements sem er búið til
 */
function createContent(item, parent) {
  const typeOfContent = item.type;
  const content = parent;
  let i;
  let j;

  switch (typeOfContent) {
    default:
      console.error('No content');
      break;
    case 'youtube':
      j = document.createElement('div');
      j.classList.add('lecture__video-container');

      i = document.createElement('iframe');
      i.classList.add('lecture__video');
      i.style.frameborder = '0';
      i.style.allowfullscreen = '0';
      i.src = item.data;

      j.appendChild(i);
      content.appendChild(j);
      break;
    case 'text':
      j = item.data.split('\n');
      j.forEach((txt) => {
        i = el('p', txt);
        i.classList.add('lecture__text');
        content.appendChild(i);
      });
      break;
    case 'image':
      j = document.createElement('div');
      j.classList.add('lecture__image-container');

      i = document.createElement('img');
      i.classList.add('lecture__image');
      i.src = item.data;
      i.alt = item.caption;
      j.appendChild(i);

      if (item.caption) {
        i = el('p', item.caption);
        i.classList.add('lecture__image-caption');
        j.appendChild(i);
      }

      content.appendChild(j);
      break;
    case 'quote':
      j = document.createElement('div');
      j.classList.add('lecture__quote-container');

      i = el('p', item.data);
      i.classList.add('lecture__quote-text');
      j.appendChild(i);

      i = el('p', item.attribute);
      i.classList.add('lecture__quote-author');
      j.appendChild(i);

      content.appendChild(j);
      break;
    case 'heading':
      i = el('h3', item.data);
      i.classList.add('lecture__heading');

      content.appendChild(i);
      break;
    case 'code':
      i = el('pre', item.data);
      i.classList.add('lecture__code');

      content.appendChild(i);
      break;
    case 'list':
      j = document.createElement('ul');
      j.classList.add('lecture__list');
      item.data.forEach((text) => {
        i = el('li', text);
        i.classList.add('lecture__list-item');
        j.appendChild(i);
      });
      content.appendChild(j);
      break;
  }
}

/**
 * Elements fyrir lectures/index siðunni
 *
 * @param {*} object hluturinn sem er notaður
 */
export function createElement(object) {
  // HEADER PORTION
  const page = document.querySelector('body');
  const intro = el('header');
  intro.classList.add('intro');
  if (object.image) {
    intro.style.backgroundImage = `url("${object.image}")`;
  } else intro.style.backgroundImage = 'url("/img/code.jpg")';
  // else ef ekkert image er til staðar

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
  let column;
  object.content.forEach((item) => {
    column = el('div');
    column.classList.add('lecture__column');
    section.appendChild(column);
    createContent(item, column);
  });

  // FOOTER PORTION
  const footer = el('footer');
  footer.classList.add('outro');

  const search = new URLSearchParams(window.location.search);
  const slug = search.get('slug');
  let completed = loadLectures();
  let slugIndex = completed.indexOf(slug);

  const finish = document.createElement('button');
  finish.classList.add('outro__button');

  if (slugIndex > -1) {
    finish.innerHTML = '✓ Kláraður fyrirlestur';
    finish.classList.toggle('outro__button--completed');
  } else finish.innerHTML = 'Klára fyrirlestur';

  finish.addEventListener('click', () => {
    completeLecture(slug);
    completed = loadLectures();
    slugIndex = completed.indexOf(slug);

    finish.classList.toggle('outro__button--completed');

    if (slugIndex > -1) {
      finish.innerHTML = '✓ Kláraður fyrirlestur';
    } else finish.innerHTML = 'Klára fyrirlestur';
  });

  footer.appendChild(finish);

  const back = el('a', 'Til baka');
  back.classList.add('outro__button');
  back.setAttribute('href', 'index.html');
  footer.appendChild(back);

  // Insert in HTML before <script>
  page.insertBefore(footer, page.lastElementChild);
}
