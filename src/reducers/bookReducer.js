import { SEARCH_BOOK, SELECT_BOOK, SET_SHELVED_BOOKS, UNSELECT_BOOK, CLEAR_SEARCH, SET_BOOK_DETAILS, SEARCH_AUTHOR_BOOKS, SIMILAR_BOOKS } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  selectedBookDetails: null,
  shelvedBooks: [],
  modalOpen: false
}

export default function bookReducer(state = initialBookState, action) {
  // console.log("bookReducer:", state, action)

  switch (action.type) {
    case SET_SHELVED_BOOKS:
    return { ...state, shelvedBooks: action.payload }
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    case SEARCH_AUTHOR_BOOKS:
    return { ...state, searchResults: action.payload.GoodreadsResponse.author.books.book }
    case SELECT_BOOK:
    return { ...state, selectedBook: action.payload, modalOpen: true }
    case UNSELECT_BOOK:
    return { ...state, selectedBook: null, modalOpen: false, selectedBookDetails: null }
    case CLEAR_SEARCH:
    return { ...state, searchResults: null }
    case SET_BOOK_DETAILS:
    return { ...state, selectedBookDetails: action.payload.GoodreadsResponse.book }
    case SIMILAR_BOOKS:
    return { ...state, searchResults: action.payload.similar_books.book }
    default:
    return state
  }
}
