const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlerware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')

logger.info('Connecting to',config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api',blogRouter)
app.use(middlerware.unknownendpoint)
app.use(middlerware.errorHandler)

module.exports = app
