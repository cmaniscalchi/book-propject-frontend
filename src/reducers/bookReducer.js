import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: []
}

export default function bookReducer(state = initialBookState, action) {
  console.log("bookReducer:", state, action)
  switch (action.type) {
    case SET_SHELVED_BOOKS:
    return { ...state, shelvedBooks: action.payload }
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    case SELECT_BOOK:
    return { ...state, selectedBook: action.payload }
    case SAVE_BOOK:
    return { ...state, shelvedBooks: state.shelvedBooks.concat(action.payload) }
    case UNSELECT_BOOK:
    return { ...state, selectedBook: null }
    default:
    return state
  }
}
