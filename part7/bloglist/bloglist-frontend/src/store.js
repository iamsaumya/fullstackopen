import notficationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,combineReducers,applyMiddleware} from 'redux'

const reducers = combineReducers({
    notification: notficationReducer
})

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store