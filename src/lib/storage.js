
/**
 * Skila JSON af localStorage
 */
export function loadLectures() {
  const completed = JSON.parse(localStorage.getItem('completed_lectures'));
  return completed;
}

export function completeLecture(slug) {
  // TODO vista núverandi slug í localStorage ef verið er að skrá fyrirlestur sem kláraður
  // fjarlægja núverandi slug ef verið er að skrá fyrirlestur sem ekki kláraður
}
