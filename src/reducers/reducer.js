const initialState = {
  searchResults: [
    { author: "Gabriel García Márquez", title: "One Hundred Years of Solitude", goodreads_book_id: 320, publication_year: 1967 },
    { author: "John Steinbeck", title: "The Grapes of Wrath", goodreads_book_id: 4397, publication_year: 1939 },
    { author: "John Steinbeck", title: "East of Eden", goodreads_book_id: 4406, publication_year: 1952 },
    { author: "Salman Rushdie", title: "Haroun and the Sea of Stories", goodreads_book_id: 4835, publication_year: 1990 },
    { author: "J.M. Coetzee", title: "Waiting for the Barbarians", goodreads_book_id: 6194, publication_year: 1980 },
    { author: "Ian McEwan", title: "Atonement", goodreads_book_id: 6867, publication_year: 2001 },
    { author: "Barbara Kingsolver", title: "The Poisonwood Bible", goodreads_book_id: 7244, publication_year: 1998 },
    { author: "Isabel Allende", title: "The House of the Spirits", goodreads_book_id: 9331, publication_year: 1982 }
  ],
  selectedBook: {},
  shelvedBooks: []
}

export default function reducer(state = initialState, action) {
  console.log("Reducer:", state, action)
  switch (action.type) {
    case 'SELECT_BOOK':
    return { ...state, selectedBook: action.payload }
    default:
      return state
  }
}
