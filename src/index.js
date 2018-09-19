import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'

// App
//   NavBar
//   SearchBar (local state)
//   BookSearchList
//     Book
//   Bookshelf
//     Book
//   BookDetail

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
