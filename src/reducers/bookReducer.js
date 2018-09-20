import { SEARCH_BOOK } from '../types'

const initialBookState = {
  searchResults: [],
  // [
  //   { author: "Gabriel García Márquez", title: "One Hundred Years of Solitude", goodreads_book_id: 320, publication_year: 1967 },
  //   { author: "John Steinbeck", title: "East of Eden", goodreads_book_id: 4406, publication_year: 1952 },
  //   { author: "Salman Rushdie", title: "Haroun and the Sea of Stories", goodreads_book_id: 4835, publication_year: 1990 },
  //   { author: "J.M. Coetzee", title: "Waiting for the Barbarians", goodreads_book_id: 6194, publication_year: 1980 },
  //   { author: "Ian McEwan", title: "Atonement", goodreads_book_id: 6867, publication_year: 2001 },
  //   { author: "Barbara Kingsolver", title: "The Poisonwood Bible", goodreads_book_id: 7244, publication_year: 1998 },
  //   { author: "Isabel Allende", title: "The House of the Spirits", goodreads_book_id: 9331, publication_year: 1982 }
  // ],
  selectedBook: {},
  shelvedBooks: []
}

export default function bookReducer(state = initialBookState, action) {
  // console.log("bookReducer:", state, action)
  switch (action.type) {
    case SEARCH_BOOK:
    return { ...state, searchResults: action.payload.GoodreadsResponse.search.results.work }
    default:
      return state
  }
}
