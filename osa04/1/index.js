const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

const getTokenFrom = (request, response, next) => {
  request.body.token = request.headers.authorization.substring(7)
  next()
}


app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(getTokenFrom)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}