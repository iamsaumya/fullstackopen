import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notficationReducer from './reducers/notificationReducer'
import anecdoteReducerFilter from './reducers/anecdoteFilterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notficationReducer,
  filter: anecdoteReducerFilter
})

const store = createStore(reducer,composeWithDevTools(
  applyMiddleware(thunk)
))

export default store