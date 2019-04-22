export const SET_OPTION = 'CHANGE_OPTION'
export const SET_WALLPAPERS = 'SET_WALLPAPERS'
export const APPEND_WALLPAPERS = 'APPEND_WALLPAPERS'

export function queryOption(state = {
    topic: 'toplist',
    categories: [],
    page: 1,
    q: ''
}, {type, payload}) {
    switch (type) {
        case SET_OPTION:
            console.log({...state, ...payload})
            return {...state, ...payload}
        default:
            return state
    }
}

export function wallpaper(state = {
    wallpapers: []
}, action) {
    switch (action.type) {
        case SET_WALLPAPERS:
            return action.payload
        case APPEND_WALLPAPERS:
            return {
                ...state,
                wallpapers: [...state.wallpapers, ...action.payload.wallpapers]
            }
        default:
            return state
    }
}