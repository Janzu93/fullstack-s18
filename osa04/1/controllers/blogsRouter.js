const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
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
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
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
