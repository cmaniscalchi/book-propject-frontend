import { DISPLAY_BOOKSHELF, SEARCH_BOOK, SELECT_BOOK, SAVE_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  selectedBook: null,
  shelvedBooks: [
    { author: "Charles Webb",
    bookshelves: [],
    goodreads_author_id: 40163,
    goodreads_book_id: 71047,
    id: 45,
    image_url: "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
    publication_year: 1963,
    title: "The Graduate" },
    { author: "Isabel Allende",
    bookshelves: [],
    goodreads_author_id: 2238,
    goodreads_book_id: 9328,
    id: 47,
    image_url: "https://images.gr-assets.com/books/1358615501m/9328.jpg",
    publication_year: 1982,
    title: "The House of the Spirits" }
  ]
}

export default function bookReducer(state = initialBookState, action) {
  // console.log("bookReducer:", state, action)
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
