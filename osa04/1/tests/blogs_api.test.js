const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

describe('Test GET', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Test POST', () => {
  const newBlog =  {
    title: "Reaction patterns",
    author: "Michael Changgg",
    url: "https://reactpatterns.com.ion/",
    likes: 0
  }

  test('blogs are added when POST', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })
})
afterAll(() => {
  server.close()
})