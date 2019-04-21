import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { wallpaper, queryOption } from './wallpaper.js'
const reducers = combineReducers({
    wallpaper,
    queryOption
})
const store = createStore(reducers)
export default function withStore(App) {
    return (
        <Provider store = {store}>
            <App/>
        </Provider>
    )
}