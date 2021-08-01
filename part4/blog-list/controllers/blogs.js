const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogsRouter.post("/", (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.author || !blog.url) {
        response.status(400).end()
    } else {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    }
    
})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(error) {
        console.error(`${error.name}, ${error.message}`)
    }

})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const update = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(update)
    } catch(error) {
        console.error(`${error.name}, ${error.message}`)
    }
    
})

module.exports = blogsRouter