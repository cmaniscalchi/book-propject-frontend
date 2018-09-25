import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
// const BASE_URL = `http://localhost:3000/api/v1/`

// TODO: move all api calls to adapters folder

export const setShelvedBooks = (books) => {
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
  let chosenBook = book.best_book
  let chosenAuthor = book.best_book.author
  let urlSuffix = `books`

  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      title: chosenBook["title"],
      author: chosenAuthor["name"],
      goodreads_book_id: chosenBook["id"],
      goodreads_author_id: chosenAuthor["id"],
      publication_year: book["original_publication_year"],
      image_url: chosenBook["image_url"],
      bookshelf_id: userId
    })
  }
  let request = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json()).then(data => console.log(data))

  return {
    type: SAVE_BOOK,
    payload: request
  }
}
