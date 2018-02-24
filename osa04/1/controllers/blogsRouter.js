const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const blog = new Blog(request.body)

  if (blog.url === undefined || blog.title === undefined) {
    response.status(400).end()
  } else {
    if (blog.likes === undefined) {
      blog.likes = 0
    }
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.json()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformed id' })
  }
})

blogsRouter.post('/:id', async (request, response) => {

  try {
    let blog = await Blog.findById(request.params.id)
    console.log(blog)
    blog.likes = blog.likes + 1
    blog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(blog)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformed id' })
  }
})


module.exports = blogsRouter
