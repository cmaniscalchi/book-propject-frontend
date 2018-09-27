import { AUTHENTICATING_USER, SAVE_BOOKSHELF } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

export const createBookshelf = userId => {
  console.log("create default bookshelf:", userId)
  let urlSuffix = `bookshelves`
  let postConfig = {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    body: JSON.stringify({ 'bookshelf': { 'user_id': userId } })
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
