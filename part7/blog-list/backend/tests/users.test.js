const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const api = supertest(app)

const testuser = {
    username: "test",
    name: "test",
    password: "test"
}

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("password", 10)
    const user = new User({ username: "root", name:"root", passwordHash })
    await user.save()
})

describe("Create new user through HTTP POST to /api/users", () => {
    test("database length increases by 1 on a successful post", async () => {
        
        await api.post("/api/users")
            .send(testuser)
            .expect(201)
        const response = await api.get("/api/users")
        expect(response.body.length).toBe(2)
    })
    test("users returned from database do not have passwordHash field", async () => {
        await api.post("/api/users")
            .send(testuser)
            .expect(201)
        const response = await api.get("/api/users")
        expect(response.body[0].passwordHash).toBeUndefined()
    })
    test("invalid users are not created", async () => {
        const invalidUser = {
            username: "1",
            name: "nimi",
            password: "2"
        }
        await api.post("/api/users")
            .send(invalidUser)
            .expect(400)
    })
    test("created user must be unique", async () => {
        const notUniqueUser = {
            username: "root",
            name: "nimi",
            password: "passwrod"
        }
        const result = await api.post("/api/users")
            .send(notUniqueUser)
        expect(result.body.error).toContain("`username` to be unique")
    })
})

afterAll(() => {
    mongoose.connection.close()
})