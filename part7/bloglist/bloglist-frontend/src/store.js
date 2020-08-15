import notficationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,combineReducers,applyMiddleware} from 'redux'

const reducers = combineReducers({
    notification: notficationReducer,
    blogs: blogReducer,
    user: userReducer
})

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store