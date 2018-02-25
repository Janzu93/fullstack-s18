const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const users = await User.find({})
    const user = users[0]
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    if (blog.url === undefined || blog.title === undefined) {
      return response.status(400).json({ error: 'url and title must contain something' })
    }

    await blog.save()

    user.blogs = user.blogs.concat(blog)
    await user.save()

    response.status(201).json(blog)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
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
