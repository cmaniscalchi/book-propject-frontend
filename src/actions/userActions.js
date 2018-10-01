import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN, REMOVE_CURRENT_USER, SET_SHELVED_BOOKS, SAVE_BOOK, REMOVE_BOOK, SWAP_COVER } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const setShelvedBooks = userBooks => {
  return { type: SET_SHELVED_BOOKS, payload: userBooks }
}

export const failedLogin = error => ({
  type: FAILED_LOGIN,
  payload: error
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })

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

export const saveUserBook = (book, userId) => {
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

export const swapUserBookCover = (newCover, bookId) => {
  let urlSuffix = `books/${bookId}`
  let postConfig = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({ image_url: newCover })
  }
  return dispatch => {
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(book => dispatch({ type: SWAP_COVER, payload: [book, bookId] }))
  }
}
