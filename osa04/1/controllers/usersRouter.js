const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const usersAtStart = await User.find({})
    const usernames = usersAtStart.map(u => u.username)

    if (usernames.includes(body.username)) {
      return response.status(400).end()
    }
    if (body.password.length < 3) {
      return response.status(400).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    if (user.adult === undefined) {
      user.adult = true
    }

    const savedUser = await user.save()
    response.json(savedUser)

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      adult: user.adult
    }
  }
  const users = await User.find({})
  response.json(users.map(formatUser))
})

module.exports = usersRouter