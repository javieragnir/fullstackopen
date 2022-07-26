const blogsRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user')

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const body = request.body

    const user = request.user

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = (user.blogs.concat(savedBlog._id))
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    if (!request.user) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'delete user does not match post user' })
    }

    await blog.remove()
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        user: body.user,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user')
    response.json(updatedBlog)
})

module.exports = blogsRouter