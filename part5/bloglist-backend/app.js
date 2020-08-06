const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
require("express-async-errors")
const middlerware = require("./utils/middleware")
const blogRouter = require("./controller/blogs")
const userRouter = require("./controller/user")
const loginRouter = require("./controller/login")

// logger.info("Connecting to",config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

if(process.env.NODE_ENV === "test"){
	const testingRouter = require("./controller/testing")
	app.use("/api/testing",testingRouter)
}
app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middlerware.tokenExtractor)
app.use("/api",blogRouter)
app.use("/api/users",userRouter)
app.use("/api/login", loginRouter)
app.use(middlerware.unknownendpoint)
app.use(middlerware.errorHandler)

module.exports = app
