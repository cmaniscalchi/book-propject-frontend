import { applyMiddleware, createStore } from 'redux'
import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk';
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxPromise, thunk)))

export default store
