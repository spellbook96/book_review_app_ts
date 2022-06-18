import {combineReducers, createStore} from 'redux'
import { LoginReducer } from './reducers/LoginReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
  LoginReducer,
  // LoadingReducer,
})

// const store = configureStore({reducer:{
//   LoginReducer:LoginReducer,
//   LoadingReducer:LoadingReducer,
// }})
const store = createStore(reducer)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store