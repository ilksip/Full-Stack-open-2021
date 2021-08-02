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

//4.8
test("HTTP GET returns the correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(blogs.all.length)
})
//4.9
test("expect unique identifier property of the blog posts to be named id", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
})

//4.10
describe("HTTP POST request to the /api/blogs", () => {
    test("increases the total number of blogs in the system by one", async () => {
        const testblog = {
            title: "Fake Blog",
            author: "Fake Name",
            url: "http://fakedomain.fakedomain",
            likes: 1,
        } 
        await api.post("/api/blogs")
            .send(testblog)
            .expect(201)
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(blogs.all.length + 1)
    })
    test("saves the blog correctly", async () => {
        const testblog = {
            title: "Fake Blog",
            author: "Fake Name",
            url: "http://fakedomain.fakedomain",
            likes: 1,
        } 
        const response = await api.post("/api/blogs")
            .send(testblog)
            .expect(201)
        expect(response.body.title).toBe("Fake Blog")
        expect(response.body.author).toBe("Fake Name")
    })
    //4.11
    test("if request is missing the likes-property, it defaults to 0", async () => {
        const blog_without_likes = {
            title: "Fake Blog",
            author: "Fake Name",
            url: "http://fakedomain.fakedomain" 
        }
        const response = await api.post("/api/blogs")
            .send(blog_without_likes)
            .expect(201)
        expect(response.body.likes).toBe(0)
    })
    //4.12
    test("if the title and url properties are missing from the request data, backend responds with '400 Bad Request.'", async () => {
        const blog_without_author = {
            title: "Fake Blog",
            url: "http://fakedomain.fakedomain",
            likes: 0
        }
        const blog_without_url = {
            title: "Fake Blog",
            author: "Fake Name",
            likes: 0
        }
        await api.post("/api/blogs")
            .send(blog_without_author)
            .expect(400)
        await api.post("/api/blogs")
            .send(blog_without_url)
            .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})