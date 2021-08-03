const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
        
    response.json(blogs)
})
  
blogsRouter.post("/", async (request, response) => {
    const body = request.body
    const user = request.user
    if (!request.token) {
        return response.status(401).json({error: "token missing or invalid"})
    }
    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        user: user.id,
        likes: body.likes
    })

    if (!blog.author || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete("/:id", async (request, response) => {

    if (!request.token) {
        return response.status(401).json({error: "token missing or invalid"})
    }
    const blog = await Blog.findById(request.params.id)
    
    if (request.user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    console.log("userid")
    console.log(request.user.id.toString())
    return response.status(401).json({error: "token does not match with blog author"})
    
})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(update)
})

module.exports = blogsRouter