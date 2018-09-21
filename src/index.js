import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import reducers from './reducers'

// App
//   NavBar
//   LoginForm
//   Bookshelf
//     BookshelfList
//       Book
//     BookDetail
//   BookSearch
//     SearchBar
//     BookSearchList
//       Book
//     BookDetail

ReactDOM.render(<Provider store={store(reducers)}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
