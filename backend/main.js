const express = require('express')
const cors = require('cors')
const wallheaven = require('./wallhaven.js')
const app = express()

app.use(cors())

app.get('/search', async (req, resp) => {
    const data = await wallheaven.search('random', req.query || {})
    if (data.type === 'error') {
        resp.status(400)
    }
    resp.json(data.data)
})

app.get('/wallpaper/:id', async (req, resp) => {
    const id = req.params.id
    const data = wallheaven.detailImage(id)
    if (data.type === 'error') {
        resp.status(400)
    }
    resp.json(data.data)
})

app.get('/uploader', async (req, resp) => {
    const uploader = req.query.uploader
    const data = await wallheaven.searchByUploader(uploader)
    if (data.type === 'error') {
        resp.status(400)
    }
    resp.json(data.data)
})

//get options
app.get('/options/topics', (req, res) => {
    res.json(wallheaven.OPTIONS.TOPICS)
})

app.get('/options/sorting', (req, res) => {
    res.json(wallheaven.OPTIONS.SORTING)
})

app.get('/options/categories', (req, res) => {
    res.json(wallheaven.OPTIONS.CATEGORIES)
})


app.listen(3000, () => {
    console.log("Your  server is running in localhost:3000")
})