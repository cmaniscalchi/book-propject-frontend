import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './containers/App'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

// COMPONENT HIERARCHY:
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

const background = require('./assets/imgs/smooth_wall/smooth_wall_@2X.png')

ReactDOM.render(

  <Provider store={store}>
    <Router>
      <App style={{backgroundImage: `url(${background})` }}/>
    </Router>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
