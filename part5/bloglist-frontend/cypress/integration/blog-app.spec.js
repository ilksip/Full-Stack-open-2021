

describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "test_user",
            username: "usertest",
            password: "pass"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.contains("log in to view blogs")
    })
    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#username").type("usertest")
            cy.get("#password").type("pass")
            cy.get("#login-button").click()
            cy.contains("blogs:")
            cy.contains("log in to view blogs").should("not.exist")
        })

        it("fails with wrong credentials", function () {
            cy.get("#username").type("usertest")
            cy.get("#password").type("wrongpassword")
            cy.get("#login-button").click()
            cy.contains("Wrong credentials")
            // ...
        })
    })
    describe("When logged in", function () {
        beforeEach(function () {
            cy.get("#username").type("usertest")
            cy.get("#password").type("pass")
            cy.get("#login-button").click()
        })

        it("A blog can be created", function () {
            const testBlog = {
                title: "cypress trees",
                author: "cypress",
                url: "localhost"
            }
            cy.contains("create a new blog").click()
            cy.get("#author").type(testBlog.author)
            cy.get("#title").type(testBlog.title)
            cy.get("#url").type(testBlog.url)
            cy.get("#blogSubmit").click()
            cy.get("#listOfBlogs").contains("cypress trees")
        })
    })
})