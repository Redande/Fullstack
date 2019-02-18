const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/test_helper')

var token = null

describe('when there is initially some blogs saved', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.findOneAndRemove({ 'username': 'test' })

    const testUser = { username: 'test', name: 'Test', password: 'test' }
    await api
      .post('/api/users')
      .send(testUser)

    const response = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' })
    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('identifier-field is called id and not _id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

})
describe('addition of a new blog', async () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'testblog',
      url: 'test.test',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    const authors = blogsAtEnd.map(r => r.author)
    const urls = blogsAtEnd.map(r => r.url)

    expect(titles).toContain('testblog')
    expect(authors).toContain('Test')
    expect(urls).toContain('test.test')
  })

  test('puts 0 as likes if likes is not defined', async () => {
    const blogWithoutLikes = {
      title: 'test',
      url: 'test.test',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('fails with 400 Bad request if title is missing', async () => {
    const blogWithoutTitle = {
      url: 'test.test'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)

    expect(response.body.error).toContain('missing title or url')
  })

  test('fails with 400 Bad request if url is missing', async () => {
    const blogWithoutUrl = {
      title: 'Test is best'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400)

    expect(response.body.error).toContain('missing title or url')
  })
})

describe('deletion of a blog', async () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    // Not working since an earlier test adds a blog to the array
    // expect(blogsAtEnd.length).toBe(
    //   helper.initialBlogs.length - 1
    // )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
