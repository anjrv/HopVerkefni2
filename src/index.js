import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    // Ef við erum á lecturepage skulum hlaða fyrirlestur
  } else {
    const list = new List();
    list.load();
  }
});
