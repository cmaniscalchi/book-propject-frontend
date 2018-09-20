import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK } from './types'

export function searchBook(input) {
  return {
    type: SEARCH_BOOK,
    payload: input
  }
}

export function selectBook(book) {
  return {
    type: SELECT_BOOK,
    payload: book
  }
}

export function saveBook(book) {
  return {
    type: SAVE_BOOK,
    payload: book
  }
}
