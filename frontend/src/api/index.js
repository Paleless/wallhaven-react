import fetch from '../utils/fetch.js'

export const search = option =>
    fetch({
        url: 'search',
        params: option
    })

export const getDetail = id =>
    fetch({
        url: `wallpaper/${id}`,
    })

export const searchByUploader = uploader =>
    fetch({
        url: "/uploader",
        params: {
            uploader
        }
    })

export const getTopics = () =>
    fetch({
        url: 'options/topics',
    })

export const getSorting = () =>
    fetch({
        url: 'options/sorting',
    })

export const getCat = () =>
    fetch({
        url: 'options/categories'
    })