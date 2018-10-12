import { combineReducers } from 'redux'
import bookReducer from './bookReducer'
import bookshelfReducer from './bookshelfReducer'
import userReducer from './userReducer'

export default combineReducers({
  book: bookReducer,
  bookshelf: bookshelfReducer,
  user: userReducer
})
