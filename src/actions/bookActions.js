import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, REMOVE_BOOK } from '../types'

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


export const saveBook = (book, userId) => {
  let urlSuffix = `books`
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      title: book["title"],
      author: book["author"],
      goodreads_book_id: book["goodreads_book_id"],
      goodreads_author_id: book["goodreads_author_id"],
      publication_year: book["publication_year"],
      image_url: book["image_url"],
      bookshelf_id: userId
    })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(book => dispatch({ type: SAVE_BOOK, payload: book }))
  }
}

export const deleteBook = bookId => {
  let urlSuffix = `books/${bookId}`
  let postConfig = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({ bookId })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(dispatch({ type: REMOVE_BOOK, payload: bookId }))
  }
}
