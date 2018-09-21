import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import reducers from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'

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

  <Provider store={store(reducers)}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
