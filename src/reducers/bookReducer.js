import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, REMOVE_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: []
}

// const findShelvedBook = book => book.id === action.payload

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
    case REMOVE_BOOK:
    // let index = [...shelvedBooks].findIndex(book => book.id === action.payload)
    // debugger
    return { ...state, shelvedBooks: state.shelvedBooks.filter(book => book.id !== action.payload)}
    default:
    return state
  }
}
