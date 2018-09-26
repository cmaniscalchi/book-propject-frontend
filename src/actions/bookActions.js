import { SEARCH_BOOK, SELECT_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

export const setShelvedBooks = books => {
  return {
    type: SET_SHELVED_BOOKS,
    payload: books
  }
}

export const selectBook = book => {
  return {
    type: SELECT_BOOK,
    payload: book
  }
}

export const clearSelectedBook = () => {
  return {
    type: UNSELECT_BOOK
  }
}

export const viewEditions = book => {
  return { type: 'SEARCH_EDITIONS' }
}

export const searchBook = input => {
  let urlSuffix = `book_search`
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ input })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(book => dispatch({ type: SEARCH_BOOK, payload: book }))
  }
}
