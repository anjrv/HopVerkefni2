
/**
 * Skila JSON af localStorage key: completed_lectures
 */
export function loadLectures() {
  const completed = JSON.parse(localStorage.getItem('completed_lectures')) || [];
  return completed;
}

/**
 * Skrá eitthvað slug sem klárað ef það er ekki klárað
 * Skrá eitthvað slug sem ekki klárað ef það er klárað
 * @param {*} slug slug sem er skráð
 */
export function completeLecture(slug) {
  const completed = loadLectures();
  const index = completed.indexOf(slug);

  if (index > -1) {
    completed.splice(index, 1);
  } else completed.push(slug);
  localStorage.setItem('completed_lectures', JSON.stringify(completed));
}

/**
 * Skila JSON af localStorage key: lecture_filters
 */
export function loadFilters() {
  const filters = JSON.parse(localStorage.getItem('lecture_filters')) || [];
  return filters;
}

/**
 * Skrá eitthvað type sem filtered ef það er ekki filtered
 * Skrá eitthvað slug sem ekki filtered ef það er filtered
 * @param {*} type týpan sem verður sett í filter
 */
export function toggleFilter(type) {
  const filters = loadFilters();
  const index = filters.indexOf(type);

  if (index > -1) {
    filters.splice(index, 1);
  } else filters.push(type);
  localStorage.setItem('lecture_filters', JSON.stringify(filters));
}
