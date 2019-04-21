export const SET_OPTION = 'CHANGE_OPTION'
export const SET_WALLPAPERS = 'SET_WALLPAPERS'
export const APPEND_WALLPAPERS = 'APPEND_WALLPAPERS'

export function queryOption(state = {
    topic: 'toplist',
    categories: [],
    page: 1,
    q: ''
}, action) {
    switch (action.type) {
        case SET_OPTION:
            return {
                ...state,
                ...action.payload
            }
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
                ...action.payload
            }
        default:
            return state
    }
}