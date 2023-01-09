const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = require('../app')
const testHelper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

jest.setTimeout(5000000)
let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const { username, name, password } = testHelper.sampleUser
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    let user = new User({
        username,
        name,
        passwordHash
    })
    await user.save()
    user = await User.findOne({ username })
    const userForToken = {
        username: user.username,
        id: user._id
    }
    token = jwt.sign(userForToken, process.env.SECRET)
    testHelper.initialBlogs.forEach((blog) => {
        blog.user = user._id
    })
    await Blog.insertMany(testHelper.initialBlogs)
    token = `Bearer ${token}`
})

describe('when there are some blogs initially saved', () => {
    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })

    test('all blogs have the field id', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('sending a new blog', () => {
    test('lengthens the list of blogs by one', async () => {
        await api
            .post('/api/blogs')
            .send(testHelper.singleBlog)
            .set({ Authorization: token })
            .expect(201)
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(testHelper.initialBlogs.length + 1)
    })

    test('without the field likes adds a new blog with 0 likes', async () => {
        const response = await api
            .post('/api/blogs')
            .send(testHelper.blogWithoutLikes)
            .set({ Authorization: token })
            .expect(201)
        const blogs = await api
            .get('/api/blogs')
        const sentBlog = blogs.body.find((blog) => blog.id === response.body.id)
        expect(sentBlog.likes).toBe(0)
    })

    test('without the field title or url returns 400', async () => {
        await api
            .post('/api/blogs')
            .send(testHelper.blogWithoutTitleOrUrl)
            .set({ Authorization: token })
            .expect(400)
    })
})

describe('deleting a new blog', () => {
    test('by id deletes the blog', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: token })
            .expect(204)
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(testHelper.initialBlogs.length - 1)
    })
})

describe('replacing a blog', () => {
    test('by id replaces the blog', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToReplace = blogsAtStart.body[0]
        await api
            .put(`/api/blogs/${blogToReplace.id}`)
            .send(testHelper.singleBlog)
            .expect(200)
        const blogsAtEnd = await api.get('/api/blogs')
        const replacedBlog = blogsAtEnd.body.find((blog) => blog.id === blogToReplace.id)
        delete replacedBlog.id
        delete replacedBlog.user
        expect(replacedBlog).toEqual(testHelper.singleBlog)
    })
})

describe('creating a new user', () => {
    test('with too short password or username doesnt work', async () => {
        testHelper.sampleUser.username = 'a'
        await api
            .post('/api/users')
            .send(testHelper.sampleUser)
            .expect(400)
        testHelper.sampleUser.username = 'asd'
        testHelper.sampleUser.password = 'a'
        await api
            .post('/api/users')
            .send(testHelper.sampleUser)
            .expect(400)
    })
    test('without password or username doesnt work', async () => {
        delete testHelper.sampleUser.password
        await api
            .post('/api/users')
            .send(testHelper.sampleUser)
            .expect(400)
        testHelper.sampleUser.username = 'asd'
        delete testHelper.sampleUser.username
        await api
            .post('/api/users')
            .send(testHelper.sampleUser)
            .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
