const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { format, initialUsers, nonExistingId, usersInDb } = require('./users_api_test_helper')

describe('When there are initially users', async () => {
  beforeAll(async () => {
    await User.remove({})

    const userObjects = initialUsers.map(u => new User(u))
    await Promise.all(userObjects.map(u => u.save()))
  })

  test('users are returned as JSON when GET /api/users and passwordHash is not returned', async () => {
    const usersInDatabase = await usersInDb()
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(usersInDatabase.length)

    expect(response.body[0].passwordHash).toBe(undefined)
    const returnedUsernames = response.body.map(u => u.username)
    usersInDatabase.forEach(user => {
      expect(returnedUsernames).toContain(user.username)
    })
  })
})

describe('Addition of new user', () => {

  test('POST /api/users succeeds with valid data', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      "username": "Janzu111",
      "password": "test123",
      "adult": true,
      "name": "Janne Löfhjelm"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()

    expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)

    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain("Janzu111")
  })

  test('Users with password shorter than 3 are not added', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      "username": "Janzu112",
      "password": "t",
      "adult": true,
      "name": "Janne Löfhjelm"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersAtStart.length)

    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('Users with non-unique username are not added', async () => {
    await User.remove({})
    const usersAtStart = await usersInDb()

    const newUser = {
      "username": "Janzu113",
      "password": "test123",
      "adult": true,
      "name": "Janne"
    }

    const newUser2 = {
      "username": "Janzu113",
      "password": "test123",
      "adult": true,
      "name": "I should fail!"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersAtStart.length+1)

    const userNames = usersAfterOperation.map(u => u.name)
    expect(userNames).not.toContain(newUser2.name)
  })

  test('User with undefined value "adult" gets added with value "adult" set as true', async() => {
    const usersAtStart = await usersInDb()

    const newUser = {
      "username": "Janzu114",
      "password": "test123",
      "name": "Janne"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersAtStart.length+1)
    
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)

    const user = await User.findOne({username: newUser.username})
    expect(user.adult).toBe(true)
    
  })
})