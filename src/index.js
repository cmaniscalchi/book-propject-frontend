import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import reducers from './reducers'

// App
//   NavBar
//   SearchBar (local state)
//   BookSearchList
//     Book
//   Bookshelf
//     Book
//   BookDetail

ReactDOM.render(<Provider store={store(reducers)}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
