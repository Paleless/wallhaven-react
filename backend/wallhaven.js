const cheerio = require('cheerio')
const axios = require('axios')
const OPTIONS = {
    TOPICS: ['latest', 'random', 'search', 'toplist'],
    CATEGORIES: ['general', 'anime', 'people'],
    SORTING: ['random', 'date_added', 'views', 'favorites', 'toplist']
}

function errorOf(error) {
    return Promise.reject({
        type: 'error',
        data: error
    })
}

function successOf(data) {
    return Promise.resolve({
        type: 'success',
        data
    })
}

function resolveCategories(categories) {
    return OPTIONS.CATEGORIES
        .map(item => categories.includes(item) ? '1' : '0')
        .join()
}

function resolveTags($) {
    return $('.tagname')
        .map((_, el) => {
            const tag_id = $(el).attr('href').split('/tag/').pop()
            const tag_name = $(el).text()
            return {
                tag_id,
                tag_name
            }
        })
        .toArray()
}

function resolveTotalPage($) {
    return $('.thumb-listing-page-header')
        .find('h2')
        .text()
        .split(/\s*\/\s*/)[1]
}

function resolveWallpapers($) {
    return $('figure')
        .map((_, el) => ({
            preview_src: $(el).find('img').data('src'),
            wallpaper_id: $(el).data('wallpaper-id'),
            res: $(el).find('.wall-res').text()
        }))
        .toArray()
}

const selector = (url, params = {}) =>
    axios.get(url, { params })
    .then(res => {
        const $ = cheerio.load(res.data, {
            decodeEntities: false
        })
        return $
    })
    .catch(errorOf)


/*
params: 
    topic?::string (wallpaper topic, should be chosed from options.TOPICS)
    options?::{
        page?::integer (pageNumer, start from 1)
        sorting?::string (should be chosed from optoins.SROTING)
        q?::string (keyword(if you want to search by tagname, q need to be like this: `id:${topic_id}`))
        order?::string (desc/asc)
        categories?::[string] (should be chosed from options.CATEGORIES)
    }
return: {
    wallpapers::{
        preview_src::src (the src of poster)
        wallpaper_id::id (use in detailImage)
        res::string (resolution)   
    }
    totalpages::string (the size the pages)
    related_tags: [{
        tag_name::string,
        tag_id::id(use in search)
    }]
}
 */
const search = (topic = 'random', options = {
    q: '',
    page: 1,
    sorting: 'random',
    order: 'desc',
    categories: OPTIONS.CATEGORIES
}) => {
    if (!OPTIONS.TOPICS.includes(topic)) {
        return errorOf('topic not included')
    }
    if (options.page < 1) {
        return errorOf('page should be greater than 0')
    }
    if (!OPTIONS.SORTING.includes(options.sorting)) {
        return errorOf('sorting not included')
    }
    const resolved_categories = resolveCategories(options.categories)
    const params = {
        page: options.page,
        sorting: options.sorting,
        q: options.q,
        order: options.order,
        categories: resolveCategories
    }
    return selector(`https://alpha.wallhaven.cc/${topic}`, params)
        .then($ => {
            const wallpapers = resolveWallpapers($)
            const related_tags = resolveTags($)
            const total_page = resolveTotalPage($)
            return successOf({
                wallpapers,
                total_page,
                related_tags
            })
        })
}

/*
params: 
    uploader*::string (uploader name)
    page?::integer(pageNum, start from 1)
return: {
    wallpapers::{
        preview_src::url (the src of poster)
        wallpaper_id::id (use in detailImage)
        res::string (resolution)   
    }
    totalpages::string (the size the pages)
    related_tags: [{
        tag_name::string,
        tag_id::id(use in search)
    }]
}*/
const searchByUploader = (uploader, page = 1) => {
    if (!uploader) {
        return errorOf('params:uploader are required')
    }
    return selector(`https://alpha.wallhaven.cc/user/${uploader}/uploads?page=${page}`)
        .then($ => {
            const wallpapers = resolveWallpapers($)
            const related_tags = resolveTags($)
            const total_page = resolveTotalPage($)
            return successOf({
                wallpapers,
                total_page,
                related_tags
            })
        })
}

/*
params:
    wallpaper_id*::id
return:{
    img_src::src
    related_tags::{
    
    }
    uploader::string (uploader name, use in searchByUploader)
} 
 */
const detailImage = (wallpaper_id) => {
    if (!wallpaper_id) {
        return errorOf("params:wallpaper_id are required")
    }
    return selector(`https://alpha.wallhaven.cc/wallpaper/${wallpaper_id}`)
        .then($ => {
            const img_src = $('#wallpaper').attr('src')
            const related_tags = resolveTags($)
            const uploader = $('.username').text()
            if (!img_src) {
                return Promise.reject({
                    type: 'error',
                    data: "img can't find"
                })
            }
            return successOf({
                img_src,
                related_tags,
                uploader
            })
        })
}


module.exports = {
    search,
    searchByUploader,
    detailImage,
    OPTIONS
}