import { AUTHENTICATING_USER, SET_CURRENT_USER, FAILED_LOGIN } from '../types'

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/`

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
    .then(JSONResponse => {
      console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
      localStorage.setItem('jwt', JSONResponse.jwt)

    dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user})
    })
    .catch(res => res.json()
    .then(error => dispatch({
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
    .then(JSONResponse => dispatch(setCurrentUser(JSONResponse.user)))
  }
}


export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: FAILED_LOGIN,
  payload: errorMsg
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })
