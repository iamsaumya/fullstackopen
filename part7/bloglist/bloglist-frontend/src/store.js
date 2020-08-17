import notficationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore,combineReducers,applyMiddleware } from 'redux'

const reducers = combineReducers({
  notification: notficationReducer,
  blogs: blogReducer,
  loggedInUser: loggedUserReducer,
  users: usersReducer
})

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store