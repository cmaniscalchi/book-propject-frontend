import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, REMOVE_CURRENT_USER, SET_SHELVED_BOOKS, SET_DEFAULT_BOOKSHELF, SAVE_BOOK, REMOVE_BOOK, SAVE_BOOKSHELF, SWAP_COVER, UPDATE_BOOKSHELF } from '../types'

const initialUserState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null,
  shelvedBooks: [],
  currentBookshelf: null
}

export default function userReducer(state = initialUserState, action) {
  // console.log("userReducer:", state, action)
  switch (action.type) {
    case SET_SHELVED_BOOKS:
      return { ...state, shelvedBooks: state.user.books }
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case SET_DEFAULT_BOOKSHELF:
      return { ...state, currentBookshelf: state.user.bookshelves[0] }

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
      let bookIndex = state.user.books.findIndex(book => book.id === action.payload[1])
      return { ...state, user: {...state.user, books: state.user.books.slice(0, bookIndex).concat(action.payload[0])
      .concat(state.user.books.slice(bookIndex + 1)) } }
    case UPDATE_BOOKSHELF:
      let bookshelfIndex = state.user.bookshelves.findIndex(bookshelf => bookshelf.id === action.payload[1])
      return { ...state, currentBookshelf: action.payload[0], user: {...state.user, bookshelves: state.user.bookshelves.slice(0, bookshelfIndex).concat(action.payload[0])
      .concat(state.user.bookshelves.slice(bookshelfIndex + 1))} }
    default:
      return state
  }
}
