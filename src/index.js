import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// App
//   NavBar
//   SearchBar (local state)
//   BookSearchList
//     Book
//   Bookshelf
//     Book
//   BookDetail

// Initial State: {
//   searchResults: [],
//   selectedBook: {},
//   bookshelfBooks: []
// }

function reducer(state, action) {
  switch (action.type) {
    // case expression:
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
