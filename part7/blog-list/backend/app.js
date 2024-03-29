const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", middleware.tokenExtractor)
app.use("/api/blogs", middleware.userExtractor)
app.use("/api/blogs", blogsRouter)

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    console.log("testing db")
    const testsRouter = require("./controllers/testing")
    app.use("/api/testing", testsRouter)
}

app.use(middleware.errorHandler)
module.exports = app