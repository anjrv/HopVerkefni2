
/**
 * Skila JSON af localStorage
 */
export function loadLectures() {
  const completed = JSON.parse(localStorage.getItem('completed_lecture'));
  return completed;
}

/**
 * Uppfæra localStorage þegar einhver "slug" er vistað.
 *
 * Tekur JSON return úr localStorage og bætir við það sem er verið að vista.
 * @param {*} slug slug skilgreining úr lectures.json
 */
export function saveLecture(slug) {
  const completed = loadLectures();

  const index = completed.indexOf(slug);

  if (index >= 0) {
    completed.splice(index, 1);
  } else {
    completed.push(slug);
  }
  localStorage.setItem('completed_lecture', JSON.stringify(completed));
}
