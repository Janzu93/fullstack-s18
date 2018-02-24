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
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId()

    const response = await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('404 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/notes/${invalidId}`)
      .expect(404)
  })
})

describe('Addition of new blog', () => {

  test('POST /api/notes succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: "Reaction patterns",
      author: "Michael Changgg",
      url: "https://reactpatterns.com.ion/",
      likes: 0
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).toContain("Reaction patterns")
  })

  test('Blogs without likes get added with 0 likes', async () => {

    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: "Reaction patterns",
      author: "Michael Changgg",
      url: "https://reactpatterns.com.ion/"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const likes = blogsAfterOperation.map(r => r.likes)
    expect(likes).toContain(0)

  })

  test('Adding blogs without title return "400 Bad request" and don\'t modify db', async () => {

    const newBlog = {
      author: "Michael Changgg",
      url: "https://reactpatterns.com.ion/"
    }

    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAfterOperation.length)
  })

  test('Adding blogs without url return "400 Bad request" and don\'t modify db', async () => {

    const newBlog = {
      title: "Reaction patterns",
      author: "Michael Changgg"
    }
    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const blogsAfterOperation = await blogsInDb()
    expect(blogsAtStart.length).toBe(blogsAfterOperation.length)
  })
})

describe('Deleting one blog', async () => {

  test('Deleting blog with id deletes blog and returns expected statuscode', async () => {

    const blogsAtStart = await blogsInDb()

    const blog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(200)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAfterOperation.length + 1)
    expect(blogsAfterOperation).not.toContain(blog)
  })

  test('Deleting with unexisting id doesn\'t delete and returns expected statuscode', async () => {

    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/5a3d5da59070081a82a3445`)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAfterOperation.length)
  })
})

describe('Editing blogs works as expected', async () => {
  test('POST to /api/blogs/:id increases likes by 1 and returns expected statuscode', async () => {
    const blogsAtStart = await blogsInDb()
    const blog = blogsAtStart[0]

    await api
      .post(`/api/blogs/${blog.id}`)
      .expect(200)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAtStart[0].likes).toBe(blogsAfterOperation[0].likes - 1)
  })

  test('POST to /api/blogs/:id with non-existing id fails and returns expected statuscode', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/blogs/5a3d5da59070081a82a3445')
      .expect(400)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAtStart[0].likes).toBe(blogsAfterOperation[0].likes)
  })
})

afterAll(() => {
  server.close()
})