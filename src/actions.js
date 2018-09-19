export function saveBookAction(book) {
  return {
    type: 'SAVE_BOOK',
    payload: book
  }
}

export function selectBookAction(book) {
  return {
    type: 'SELECT_BOOK',
    payload: book
  }
}
