import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK } from './types'

export function searchBook(input) {
  const url = 'http://localhost:3001/api/v1/book_search'
  const postConfig = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input })
  }
  const request = fetch(url, postConfig).then(res => res.json())
  return {
    type: SEARCH_BOOK,
    payload: request
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
