import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, REMOVE_BOOK } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
// const BASE_URL = `http://localhost:3000/api/v1/`

// TODO: move all api calls to adapters folder

export const setShelvedBooks = books => {
  return {
    type: SET_SHELVED_BOOKS,
    payload: books
  }
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
  let request = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json())

  return {
    type: SEARCH_BOOK,
    payload: request
  }
}

export const selectBook = book => {
  return {
    type: SELECT_BOOK,
    payload: book
  }
}

export const saveBook = (book, userId) => {
  let urlSuffix = `books`
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
  let request = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json())

  return {
    type: SAVE_BOOK,
    payload: request
  }
}

export const viewEditions = book => {
  console.log("viewEditions:", book)
  return { type: 'SEARCH_EDITIONS' }
}

export const deleteBook = bookId => {
  let urlSuffix = `books/${bookId}`
  let postConfig = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ bookId })
  }
  fetch(`${BASE_URL}${urlSuffix}`, postConfig)

  return {
    type: REMOVE_BOOK,
    payload: bookId
  }
}

export const resetSelectedBook = () => {
  return {
    type: UNSELECT_BOOK
  }
}
