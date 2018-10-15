import { SEARCH_BOOK, SELECT_BOOK, UNSELECT_BOOK, CLEAR_SEARCH, SET_BOOK_DETAILS, SEARCH_AUTHOR_BOOKS, SIMILAR_BOOKS, SEARCH_BOOK_COVER, SELECT_BOOK_COVER, UNSELECT_BOOK_COVER } from '../types'

export const selectBook = book => {
  return { type: SELECT_BOOK, payload: book }
}

export const selectCover = book => {
  return { type: SELECT_BOOK_COVER, payload: book }
}

export const clearSelectedBook = () => {
  return { type: UNSELECT_BOOK }
}

export const clearSelectedCover = () => {
  return { type: UNSELECT_BOOK_COVER }
}

export const clearSearchResults = () => {
  return { type: CLEAR_SEARCH }
}

export const viewSimilarBooks = book => {
  return { type: SIMILAR_BOOKS, payload: book }
}

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
const HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
}

export const searchBook = input => {
  let urlSuffix = `book_search`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ input })
  }

  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(books => dispatch({ type: SEARCH_BOOK, payload: books }))
  }
}

export const getBookDetails = id => {
  let urlSuffix = `book_details`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ id })
  }

  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(details => dispatch({ type: SET_BOOK_DETAILS, payload: details }))
  }
}

export const searchBookCovers = (title, author) => {
  let urlSuffix = `book_cover_search`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ title, author })
  }

  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(books => dispatch({ type: SEARCH_BOOK_COVER, payload: [books, title] }))
  }
}

export const searchAuthorBooks = authorId => {
  let urlSuffix = `author_book_search`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ authorId })
  }

  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(books => dispatch({ type: SEARCH_AUTHOR_BOOKS, payload: books }))
  }
}
