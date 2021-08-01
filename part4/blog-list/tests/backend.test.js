const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blogs = require("../utils/blog_examples")
const Blog = require("../models/blog")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs.all)
})

test("HTTP GET returns the correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(blogs.all.length)
})
afterAll(() => {
    mongoose.connection.close()
})