import { SELECT_BOOKSHELF, UNSELECT_BOOKSHELF, RENAME_BOOKSHELF } from '../types'

const initialBookshelfState = {
  selectedBookshelf: null
}

export default function bookshelfReducer(state = initialBookshelfState, action) {
  console.log("bookshelfReducer:", state, action)

  switch (action.type) {
    case SELECT_BOOKSHELF:
    return { ...state, selectedBookshelf: action.payload }
    case UNSELECT_BOOKSHELF:
    return { ...state, selectedBookshelf: null }
    case RENAME_BOOKSHELF:
    return state
    default:
    return state
  }
}
