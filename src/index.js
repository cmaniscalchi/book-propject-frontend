import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

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

ReactDOM.render(

  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
