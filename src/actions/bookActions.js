import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK } from '../types'

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
  // let {title, id} = book.best_book
  // let image_url = book.best_book.image_url.replace("m/", "l/").replace("m/", "l/").replace("col/", "com/")
  // let {name} = book.best_book.author
  // let authorId = book.best_book.author.id
  // let publication_year = book.original_publication_year
  // let formattedBook = {
  //   title, image_url, publication_year, author: name, goodreads_book_id: id, goodreads_author_id: authorId
  // }

  console.log("selectBook:", book)
  return {
    type: SELECT_BOOK,
    payload: book
  }
}

// export const selectBookFromRails = book => {
//   console.log("selectBookFromRails:", book)
//   return {
//     type: SELECT_BOOK,
//     payload: book
//   }
// }

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
  let request = fetch(`${BASE_URL}${urlSuffix}`, postConfig).then(res => res.json()).then(data => console.log(data))

  return {
    type: SAVE_BOOK,
    payload: request
  }
}

export const viewEditions = book => {
  console.log("viewEditions:", book)
}

export const deleteBook = (book, userId) => {
  console.log("deleteBook:", book, userId)
}

export const resetSelectedBook = () => {
  return {
    type: UNSELECT_BOOK
  }
}
