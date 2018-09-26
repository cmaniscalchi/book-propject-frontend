import { SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, REMOVE_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: []
}

// const saveBook = (state, action) => { ...state, shelvedBooks: state.shelvedBooks.concat(action.payload) }

export default function bookReducer(state = initialBookState, action) {
  console.log("bookReducer:", state, action)
  // debugger

  switch (action.type) {
    case SET_SHELVED_BOOKS:
    return { ...state, shelvedBooks: action.payload }
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    case SELECT_BOOK:
    return { ...state, selectedBook: action.payload }
    case UNSELECT_BOOK:
    return { ...state, selectedBook: null }
    case SAVE_BOOK:
    return { ...state, shelvedBooks: state.shelvedBooks.concat(action.payload), selectedBook: null }
    // case SAVE_BOOK:
    // return saveBook(state, action)
    case REMOVE_BOOK:
    return { ...state, shelvedBooks: state.shelvedBooks.filter(book => book.id !== action.payload), selectedBook: null}
    default:
    return state
  }
}
