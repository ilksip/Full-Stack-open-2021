const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.post("/", async (request, response, next) => {
    const body = request.body
    if (body.password.length >= 3 && body.username.length >= 3) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash
        })
        try {
            const savedUser = await user.save()
            response.status(201).json(savedUser)
        } catch(exception) {
            next(exception)
        }
        
    } else {
        response.status(400).json({error: "Both username and password must be at least 3 characters long"})
    }
    
})

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter