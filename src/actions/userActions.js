import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, REMOVE_CURRENT_USER, SET_SHELVED_BOOKS, SET_DEFAULT_BOOKSHELF, SAVE_BOOK, REMOVE_BOOK, SWAP_COVER, UPDATE_BOOKSHELF, MANAGE_BOOKSHELF, CANCEL_MANAGE_BOOKSHELF } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
}

export const setCurrentUser = userData => {
  return { type: SET_CURRENT_USER, payload: userData }
}

export const setShelvedBooks = userBooks => {
  return { type: SET_SHELVED_BOOKS, payload: userBooks }
}

export const setDefaultBookshelf = () => ({ type: SET_DEFAULT_BOOKSHELF })

export const failedLogin = error => {
  return { type: FAILED_LOGIN, payload: error }
}

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })

export const manageUserBookshelves = () => ({ type: MANAGE_BOOKSHELF })

export const cancelManageUserBookshelves = () => ({ type: CANCEL_MANAGE_BOOKSHELF })

export const loginUser = (name, password) => {
  let urlSuffix = `login`
  let postConfig = {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ user: { name, password } })
  }

  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => {
      if (res.ok) { return res.json()}
      else { throw res }
    })
    .then(userData => {
      localStorage.setItem('jwt', userData.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: userData.user})
    })
    .catch(res => res.json().then(error => dispatch({
      type: FAILED_LOGIN,
      payload: error.message })
    ))
  }
}

export const signUpUser = (name, password) => {
  let urlSuffix = `users`
  let postConfig = {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ user: { name, password } })
  }

  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => {
      if (res.ok) { return res.json()}
      else { throw res }
    })
    .then(userData => {
      localStorage.setItem('jwt', userData.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: userData.user})
    })
    .catch(res => res.json().then(error => dispatch({
      type: FAILED_LOGIN,
      payload: error.message })
    ))
  }
}

export const fetchCurrentUser = () => {
  return dispatch => {
    let urlSuffix = `bookshelf`
    let getConfig = {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    }
    dispatch(authenticatingUser())

    fetch(`${BASE_URL}${urlSuffix}`, getConfig)
    .then(res => res.json())
    .then(userData => dispatch(setCurrentUser(userData.user)))
  }
}

export const logoutUser = name => {
  let urlSuffix = `logout`
  let postConfig = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "user": { "name": name } })
  }

  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => {
      localStorage.removeItem('jwt')
      dispatch({ type: REMOVE_CURRENT_USER })
    })
  }
}

export const deleteUserBook = bookId => {
  let urlSuffix = `books/${bookId}`
  let postConfig = {
    method: "DELETE",
    headers: HEADERS,
    body: JSON.stringify({ bookId })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(dispatch({ type: REMOVE_BOOK, payload: bookId }))
  }
}

export const saveUserBook = (book, bookshelfId) => {
  let urlSuffix = `books`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      title: book["title"],
      author: book["author"],
      goodreads_book_id: book["goodreads_book_id"],
      goodreads_author_id: book["goodreads_author_id"],
      publication_year: book["publication_year"],
      image_url: book["image_url"],
      bookshelf_id: bookshelfId
    })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(book => dispatch({ type: SAVE_BOOK, payload: book }))
  }
}

export const swapUserBookCover = (newCover, bookId) => {
  let urlSuffix = `books/${bookId}`
  let patchConfig = {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ image_url: newCover })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, patchConfig)
    .then(res => res.json())
    .then(book => dispatch({ type: SWAP_COVER, payload: [book, bookId] }))
  }
}

export const renameUserBookshelf = (input, bookshelfId) => {
  let urlSuffix = `bookshelves/${bookshelfId}`
  let patchConfig = {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ 'name': input })
  }

  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, patchConfig)
    .then(res => res.json())
    .then(bookshelf => dispatch({ type: UPDATE_BOOKSHELF, payload: [bookshelf, bookshelfId] }))
  }
}
