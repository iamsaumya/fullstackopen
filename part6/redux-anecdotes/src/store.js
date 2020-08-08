import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notficationReducer from './reducers/notificationReducer'
import anecdoteReducerFilter from './reducers/anecdoteFilterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notficationReducer,
  filter: anecdoteReducerFilter
})

const store = createStore(reducer,composeWithDevTools())

export default store