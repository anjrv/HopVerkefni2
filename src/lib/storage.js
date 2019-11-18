
/**
 * Skila JSON af localStorage
 */
export function loadLectures() {
  const saved = JSON.parse(localStorage.getItem('saved_lectures'));
  return saved;
}

/**
 * Uppfæra localStorage þegar einhver "slug" er vistað.
 *
 * Tekur JSON return úr localStorage og bætir við það sem er verið að vista.
 * @param {*} slug slug skilgreining úr lectures.json
 */
export function saveLecture(slug) {
  const saved = loadLectures();

  const index = saved.indexOf(slug);

  if (index >= 0) {
    saved.splice(index, 1);
  } else {
    saved.push(slug);
  }
  localStorage.setItem('saved_lectures', JSON.stringify(saved));
}
