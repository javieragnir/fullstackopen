const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 100000)

describe('get returns blogs in correct format', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('get returns correct number of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier of blog posts is "id"', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        expect(blogToView.id).toBeDefined()

    }, 100000)
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    describe('when posting', () => {
        test('a valid blog can be added', async () => {
            const user = await helper.getOneUser()
            const token = helper.createToken(user)

            const newBlog = {
                title: 'The Art of Testing',
                author: 'Testy McTester',
                url: 'https://www.test.com',
                likes: 5
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles).toContain(
                'The Art of Testing'
            )
        })

        test('likes field defaults to 0 if missing', async () => {
            const user = await helper.getOneUser()
            const token = helper.createToken(user)

            const newBlog = {
                title: 'How to drive a boat',
                author: 'Spongebob Squarepants',
                url: 'https://www.spongeboat.com'
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()

            const blogToView = blogsAtEnd[blogsAtEnd.length - 1]

            expect(blogToView.likes).toBe(0)
        })

        test('rejects new blog if it has no title or url', async () => {
            const user = await helper.getOneUser()
            const token = helper.createToken(user)

            const newBlog = {
                author: 'Patrick Star',
                likes: 3
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
        const user = await helper.getOneUser()
        const token = helper.createToken(user)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const deleteId = blogToDelete.id

        await Blog.findOneAndUpdate({ id: deleteId }, { user: user })

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    }, 100000)

    test('modification of a note succeeds', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 70
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const blogToUpdateEnd = blogsAtEnd[0]
        expect(blogToUpdateEnd.title).toBe(blogToUpdate.title)
        expect(blogToUpdateEnd.author).toBe(blogToUpdate.author)
        expect(blogToUpdateEnd.url).toBe(blogToUpdate.url)
        expect(blogToUpdateEnd.likes).toBe(70)
    }, 100000)

    describe('when creating new user', () => {
        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })

        test('creation fails with proper statuscode and message if username is missing', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                name: 'spongebob squarepants',
                password: 'frycook'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            expect(result.body.error).toBe('username and/or password missing')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
        })

        test('creation fails if password is not long enough', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'patrick',
                name: 'patrick star',
                password: 'hi'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            expect(result.body.error).toBe('password must contain at least 3 characters')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})