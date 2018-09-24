import { DISPLAY_BOOKSHELF, SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: []
}

export default function bookReducer(state = initialBookState, action) {
  console.log("bookReducer:", state, action)
  switch (action.type) {
    case DISPLAY_BOOKSHELF:
    return state
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    case SELECT_BOOK:
    return { ...state, selectedBook: action.payload }
    case SAVE_BOOK:
    return { ...state, shelvedBooks: [...state.shelvedBooks, action.payload] }
    default:
    return state
  }
}
