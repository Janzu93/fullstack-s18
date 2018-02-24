const User = require('../models/user')

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    username: "Janzu",
    name: "Janne Löfhjelm",
    passwordHash: "$2a$10$Za.9gfrlKODqrHUxaYhMZusFMbOyrdFIgs9blPAqRbcGwWInov7tm",
    adult: true,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f8",
    username: "Merenwen",
    name: "Janne Löfhilm",
    passwordHash: "$2a$10$Za.9gfrlKODqrHUxaYhMZusFMbOyrdFIgs9blPAqRbcGwWInov7tm",
    adult: true,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f9",
    username: "Merzu",
    name: "Meri Kuusisto",
    passwordHash: "$2a$10$Za.9gfrlKODqrHUxaYhMZusFMbOyrdFIgs9blPAqRbcGwWInov7tm",
    adult: false,
    __v: 0
  }
]

const format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

const nonExistingId = async () => {
  const user = new User()
  await user.save()
  await user.remove()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(format)
}

module.exports = {
  initialUsers, format, nonExistingId, usersInDb
}