import { SEARCH_BOOK, SELECT_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, CLEAR_SEARCH } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: []
}

export default function bookReducer(state = initialBookState, action) {
  // console.log("bookReducer:", state, action)

  switch (action.type) {
    case SET_SHELVED_BOOKS:
    return { ...state, shelvedBooks: action.payload }
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    case SELECT_BOOK:
    return { ...state, selectedBook: action.payload }
    case UNSELECT_BOOK:
    return { ...state, selectedBook: null }
    case CLEAR_SEARCH:
    return { ...state, searchResults: [] }
    default:
    return state
  }
}
