const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const api = supertest(app)

const testuser = {
    username: "test",
    name: "test",
    password: "test"
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe("Create new user through HTTP POST to /api/users", () => {
    test("database length increases by 1 on a successful post", async () => {
        
        await api.post("/api/users")
            .send(testuser)
            .expect(201)
        const response = await api.get("/api/users")
        expect(response.body.length).toBe(1)
    })
    test("users returned from database do not have passwordHash field", async () => {
        await api.post("/api/users")
            .send(testuser)
            .expect(201)
        const response = await api.get("/api/users")
        expect(response.body[0].passwordHash).toBeUndefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})