import { applyMiddleware, createStore } from 'redux'
import ReduxPromise from 'redux-promise'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxPromise)))

export default store
