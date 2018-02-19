const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('When there are initially blogs', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('blogs are returned as JSON when GET', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogsInDatabase.length)

      const returnedTitles = response.body.map(b => b.title)
      blogsInDatabase.forEach(blog => {
        expect(returnedTitle).toContain(blog.title)
      })
  })

  test('individual blogs are returned as JSON as GET', async() => {
    const blogsInDatabase = await blogsInDb()
    const blog = blogsInDatabase[0]
    .get(`/api/blogs/${blog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(blog.title)
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

  const newBlogNoTitle = {
    author: "Michael Changgg",
    url: "https://reactpatterns.com.ion/"
  }

  const newBlogNoUrl = {
    title: "Reaction patterns",
    author: "Michael Changgg"
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

  test('Adding blogs without title return "400 Bad request"', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
  })

  test('Adding blogs without url return "400 Bad request"', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
})

afterAll(() => {
  server.close()
})