const wallheaven = require('../wallhaven.js')

describe('test fn: search', () => {
    it('should return error when parmas not right', () => {
        expect(wallheaven.search('hello')).rejects.toHaveProperty("type", "error")
        expect(wallheaven.search('random', { page: 0 })).rejects.toHaveProperty("type", "error")
        expect(wallheaven.search('random', { sorting: '333' })).rejects.toHaveProperty("type", "error")
        expect(wallheaven.search('random', { categories: [1, 3] })).rejects.toHaveProperty("type", "error")
    })

    it('should be right when use default params', () => {
        expect(wallheaven.search()).resolves.toHaveProperty("type", "success")
    })
})

describe('test fn: detailImage', () => {
    it('should be error when no wallpaper_id', () => {
        expect(wallheaven.detailImage()).rejects.toHaveProperty("type", "error")
    })

    it("should be error when wallpaper_id not exist", () => {
        expect(wallheaven.detailImage('fasdfa')).rejects.toHaveProperty("type", "error")
    })

    it("should work when wallpaper_id is useful", () => {
        expect(wallheaven.detailImage(669083)).resolves.toHaveProperty("type", "success")
    })
})


describe('test fn: searchByUploader', () => {
    it('should be error when no uplaoder', () => {
        expect(wallheaven.searchByUploader()).rejects.toHaveProperty('type', 'error')
    })
    it('should be error when uploader not exist', () => {
        expect(wallheaven.searchByUploader('@fa-fdas')).rejects.toHaveProperty('type', 'error')
    })

    it('should be success when uploader are right', () => {
        expect(wallheaven.searchByUploader('404011xz')).resolves.toHaveProperty('type', 'success')
    })
})