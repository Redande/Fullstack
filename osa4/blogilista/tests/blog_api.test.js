const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
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

})
describe('addition of a new blog', async () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'testblog',
      author: 'Test',
      url: 'test.test',
      likes: 2
    }

    await api
      .post('/api/blogs')
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
})

describe('deletion of a blog', async () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
