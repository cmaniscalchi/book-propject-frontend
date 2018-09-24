import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
// const BASE_URL = `http://localhost:3000/api/v1/`

// TODO: move all api calls to adapters folder

export const searchBook = input => {
  // debugger
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

export const saveBook = book => {
  let urlSuffix = `books`
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      title: book["best_book"]["title"],
      author: book["best_book"]["author"]["name"],
      goodreads_book_id: book["best_book"]["id"],
      goodreads_author_id: book["best_book"]["author"]["id"],
      publication_year: book["original_publication_year"],
      image_url: book["best_book"]["image_url"]
    })
  }
  let request = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json())

  return {
    type: SAVE_BOOK,
    payload: request
  }
}
