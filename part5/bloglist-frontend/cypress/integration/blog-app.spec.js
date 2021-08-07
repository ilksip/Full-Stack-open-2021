

describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "test_user",
            username: "usertest",
            password: "pass"
        }
        cy.request("POST","http://localhost:3003/api/users", user)
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
})