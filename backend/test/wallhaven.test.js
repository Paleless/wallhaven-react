const wallheaven = require('../wallhaven.js')

describe('test fn: search', () => {
    test('sholud be error when topic not right', async () => {
        const result = await wallheaven.search(topic = 'ran')
        expect(result).toMatchObject({
            "data": "topic not included",
            "type": "error",
        })
    })
    test('should be [] when params illegal', async () => {
        const result = await wallheaven.search(topic = 'random', { page: 0 })
        expect(result).toMatchObject({
            data: [],
            type: 'success'
        })
    })
})

describe('test fn: detailImage', () => {
    test("should return error when image can't find", async () => {
        const result = await wallheaven.detailImage(3)
        expect(result).toMatchObject({
            type: 'error',
            data: "img can't find"
        })
    })
})