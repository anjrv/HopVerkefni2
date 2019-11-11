//  Held að þetta skilar villu vegna þess að það er bara ein fall hérna inni.
//  Ætti að lagast þegar við bætum við fleiri helpers.

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
