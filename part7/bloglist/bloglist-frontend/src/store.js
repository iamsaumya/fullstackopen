import notficationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,combineReducers,applyMiddleware} from 'redux'

const reducers = combineReducers({
    notification: notficationReducer,
    blogs: blogReducer,
    loggedInUser: loggedUserReducer
})

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store