const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blogs = require("../utils/blog_examples")
const Blog = require("../models/blog")
const User = require("../models/user")
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
    beforeAll(async () => {
        await User.deleteMany({})
        const user = {
            "username": "user",
            "name": "test",
            "password": "pass"
        }
        await api.post("/api/users")
            .send(user)
            .expect(201)
    })
    const login = async () => {
        const credentials = {
            "username": "user",
            "password": "pass"
        }
        const login = await api.post("/api/login")
            .send(credentials)
            .expect(200)
        return login.body.token
    }

    test("increases the total number of blogs in the system by one", async () => {
        const testblog = {
            title: "Fake Blog",
            url: "http://fakedomain.fakedomain",
            likes: 1,
        }
        const token = await login()
        await api.post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
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
        const token = await login()
        const response = await api.post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(testblog)
            .expect(201)
        expect(response.body.title).toBe("Fake Blog")
        expect(response.body.author).toBe("test")
    })
    //4.11
    test("if request is missing the likes-property, it defaults to 0", async () => {
        const blog_without_likes = {
            title: "Fake Blog",
            author: "Fake Name",
            url: "http://fakedomain.fakedomain" 
        }
        const token = await login()
        const response = await api.post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(blog_without_likes)
            .expect(201)
        expect(response.body.likes).toBe(0)
    })
    //4.12
    test("if the title and url properties are missing from the request data, backend responds with '400 Bad Request.'", async () => {
        const blog_without_title = {
            url: "http://fakedomain.fakedomain",
            likes: 0
        }
        const blog_without_url = {
            title: "Fake Blog",
            likes: 0
        }
        const token = await login()

        await api.post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(blog_without_title)
            .expect(400)
        await api.post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(blog_without_url)
            .expect(400)
    })
    test("returns 401 if a token is not provided", async () => {
        const testblog = {
            title: "Fake Blog",
            url: "http://fakedomain.fakedomain",
            likes: 1,
        }
        await api.post("/api/blogs")
            .send(testblog)
            .expect(401)
    })
})
afterAll(() => {
    mongoose.connection.close()
})