const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//
const logger = require('./utils/logger')
const config = require('./utils/config')
const Blog = require('./models/blog')
const notesRouter = require('./controllers/blogs')
//

const MONGODB_URI = config.MONGODB_URI

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

/* app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
}) */

app.use('/api/blogs', notesRouter)

const PORT = 3003
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})