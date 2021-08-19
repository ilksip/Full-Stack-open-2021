import { createStore, combineReducers, applyMiddleware } from "redux"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import thunk from "redux-thunk"
const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store