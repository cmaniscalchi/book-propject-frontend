import { AUTHENTICATING_USER, SAVE_BOOKSHELF } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
}

export const createDefaultBookshelf = userId => {
  let urlSuffix = `bookshelves`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ 'bookshelf': { 'user_id': userId, 'name': 'My Bookshelf' } })
  }

  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(bookshelf => dispatch({
      type: SAVE_BOOKSHELF,
      payload: bookshelf })
    )
  }
}

export const createNewBookshelf = (userId, input) => {
  let urlSuffix = `bookshelves`
  let postConfig = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ 'bookshelf': { 'user_id': userId, 'name': input } })
  }

  return dispatch => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`${BASE_URL}${urlSuffix}`, postConfig)
    .then(res => res.json())
    .then(bookshelf => dispatch({
      type: SAVE_BOOKSHELF,
      payload: bookshelf })
    )
  }
}
