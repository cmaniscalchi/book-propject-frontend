import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, REMOVE_CURRENT_USER, SAVE_BOOK, REMOVE_BOOK, SAVE_BOOKSHELF, SWAP_COVER } from '../types'

const initialUserState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

export default function userReducer(state = initialUserState, action) {
  // console.log("userReducer:", state, action)
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN:
      return { ...state, failedLogin: true, error: action.payload, authenticatingUser: false }
    case REMOVE_CURRENT_USER:
      return initialUserState
    case SAVE_BOOK:
      return { ...state, user: {...state.user, books: state.user.books.concat(action.payload)}}
    case REMOVE_BOOK:
      return { ...state, user: {...state.user, books: state.user.books.filter(book => book.id !== action.payload)}}
    case SAVE_BOOKSHELF:
      return { ...state, user: {...state.user, bookshelves: state.user.bookshelves.concat(action.payload)}}
    case SWAP_COVER:
    let index = state.user.books.findIndex(book => book.id === action.payload[1])
      debugger;
    return state
      // return { ...state, user: {...state.user, books: state.user.books}}
    default:
      return state
  }
}
