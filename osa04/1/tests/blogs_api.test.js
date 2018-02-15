const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.remove({})
})

describe('Test GET', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Test POST', () => {
  const newBlog = {
    title: "Reaction patterns",
    author: "Michael Changgg",
    url: "https://reactpatterns.com.ion/",
    likes: 0
  }

  const newBlogNoLikes = {
    title: "Reaction patterns",
    author: "Michael Changgg",
    url: "https://reactpatterns.com.ion/"
  }

  test('blogs are added when POST', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('Blogs without likes get added with 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    expect(res.body[0].likes).toBe(0)
  })
})
afterAll(() => {
  server.close()
})