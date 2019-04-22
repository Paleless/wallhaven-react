const express = require('express')
const cors = require('cors')
const wallheaven = require('./wallhaven.js')
const app = express()

app.use(cors())

app.get('/search', (req, resp) => {
    req.query = req.query || {}
    wallheaven.search(req.query.topic || 'random', req.query)
        .then(data => {
            resp.json(data.data)
        })
        .catch(err => {
            resp.status(400)
            resp.json({
                err
            })
        })
})

app.get('/wallpaper/:id', async (req, resp) => {
    const id = req.params.id
    wallheaven.detailImage(id)
        .then(res => {
            if (res.type === 'error') {
                resp.status(400)
            }
            resp.json(res.data)
        })
        .catch(err => {
            resp.status(400)
            resp.json({ err })
        })
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

app.use((req, res, next) => {
    res.send('404')
    next()
})

app.use((err, req, res) => {
    res.json('500')
})


app.listen(3000, () => {
    console.log("Your  server is running in localhost:3000")
})