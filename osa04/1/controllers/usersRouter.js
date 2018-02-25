const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const users = await User.find({}).populate('blogs')
    const usernames = users.map(u => u.username)

    if (usernames.includes(body.username)) {
      return response.status(400).json({ error: 'Username already in use' })
    }
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password has to be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {

  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => User.format(u)))
})

module.exports = usersRouter