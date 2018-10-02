import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './containers/App'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()


// import Background from './assets/imgs/exclusive_paper/exclusive_paper_@2X.png'
//
// const style = {
//   width: "100%",
//   height: "800px",
//   backgroundImage: `url(${Background})`
// }
//
// ReactDOM.render(
//   <Provider store={ store }>
//     <Router>
//       <App style={ style }/>
//     </Router>
//   </Provider>, document.getElementById('root')
// )
// registerServiceWorker()
