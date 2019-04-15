const express = require('express')
const cors = require('cors')
const wallheaven = require('./wallhaven.js')
const app = express()

app.use(cors())
app.get('/', (req, resp) => {
    resp.set("name", "pale")
    resp.send("<h1>Hello world</h1>")
})

app.get('/search', async (req, resp) => {
    const data = await wallheaven.search('search', req.query)
    if (data.type === 'error') {
        resp.status(400)
    }
    resp.json(data)
})

app.get('/wallpaper/:id', async (req, resp) => {
    const id = req.params.id
    const data = wallheaven.detailImage(id)
    if (data.type === 'error') {
        resp.status(400)
    }
    resp.json(imageSrc)
})

//get options
app.get('/options/topics', (req, res) => {
    res.json(wallheaven.options.TOPICS)
})

app.get('/options/sorting', (req, res) => {
    res.json(wallheaven.options.SORTING)
})

app.get('/options/categories', (req, res) => {
    res.json(wallheaven.options.CATEGORIES)
})


app.listen(3000, () => {
    console.log("Your  server is running in localhost:3000")
})