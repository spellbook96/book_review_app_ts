import {combineReducers, createStore} from 'redux'
import { LoginReducer } from './reducers/LoginReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { configureStore } from '@reduxjs/toolkit'
import { CollapsedReducer } from './reducers/CollapsedReducer'
import { PaginationReducer } from './reducers/PaginationReducer'
const reducer = combineReducers({
  LoginReducer,
  CollapsedReducer,
  PaginationReducer,
})

// const store = configureStore({reducer:{
//   LoginReducer:LoginReducer,
//   LoadingReducer:LoadingReducer,
// }})
const store = createStore(reducer)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store