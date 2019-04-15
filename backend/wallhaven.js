const cheerio = require('cheerio')
const axios = require('axios')
const options = {
    TOPICS: ['latest', 'random', 'search', 'toplist'],
    CATEGORIES: ['general', 'anime', 'people'],
    SORTING: ['random', 'date_added', 'views', 'favorites', 'toplist']
}
// url -> params -> $
const selector = async (url, params = {}) => {
    try {
        const res = await axios.get(url, { params })
        const $ = cheerio.load(res.data, {
            decodeEntities: false
        })
        return $
    } catch (e) {
        console.error("fn: selector error")
        return cheerio.load('')
    }
}

//options -> [wallpaper]
const search = async (topic = 'search', params = {}) => {
    if (!options.TOPICS.includes(topic)) {
        return {
            type: 'error',
            data: 'topic not included'
        }
    }
    const $ = await selector(`https://alpha.wallhaven.cc/${topic}`, {
        page: '1',
        sorting: 'random',
        q: '',
        order: 'desc',
        categories: '111',
        ...params
    })
    const wallpapers = $('figure')
        .map((_, el) => {
            return {
                preview_src: $(el).find('img').data('src'),
                id: $(el).data('wallpaper-id')
            }
        })
        .toArray()
    return {
        type: 'success',
        data: wallpapers
    }
}

//wallpaper-id -> imgSrc
const detailImage = async (id) => {
    const $ = await selector(`https://alpha.wallhaven.cc/wallpaper/${id}`)
    const imgSrc = $('#wallpaper').attr('src')
    if (!imgSrc) {
        return {
            type: 'error',
            data: "img can't find"
        }
    }
    return {
        type: 'success',
        data: imgSrc
    }
}

module.exports = {
    search,
    detailImage,
    options
}