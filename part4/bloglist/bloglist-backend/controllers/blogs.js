const blogsRouter = require('express').Router()
const { compareSync } = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user')

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const oneUser = await User.findOne({})

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: oneUser._id
    })

    const savedBlog = await newBlog.save()
    oneUser.blogs = (oneUser.blogs.concat(savedBlog._id))
    await oneUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter