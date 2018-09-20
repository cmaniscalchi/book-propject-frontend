import { applyMiddleware, createStore } from 'redux'
import ReduxPromise from 'redux-promise'

const store = applyMiddleware(ReduxPromise)(createStore)

export default store
