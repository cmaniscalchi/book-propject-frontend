import { applyMiddleware, createStore } from 'redux'
import ReduxPromise from 'redux-promise'
// import { composeWithDevTools } from 'redux-devtools-extension'

const store = applyMiddleware(ReduxPromise)(createStore)

export default store
