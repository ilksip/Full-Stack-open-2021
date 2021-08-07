

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
            cy.login({ username: "usertest", password:"pass" })
            cy.visit("http://localhost:3000")
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

        describe("when there are blogs", function() {
            beforeEach(function () {
                cy.createBlog({ author: "cypress", title: "cypress blog", url: "url com", likes: 0 })
                cy.visit("http://localhost:3000")
            })

            it("a blog can be liked", function () {
                cy.get("#listOfBlogs")
                    .contains("cypress blog")
                    .contains("show").click()
                cy.get(".likesNumber").contains("0")
                cy.get("#likeButton").click()
                cy.get(".likesNumber").contains("1")
            })

            it("a blog can be deleted", function () {
                cy.get("#listOfBlogs")
                    .contains("cypress blog")
                    .contains("show").click()

                cy.contains("delete").click()

                cy.get("#listOfBlogs")
                    .contains("cypress blog")
                    .should("not.exist")

            })
        })
    })
    describe("When list has multiple blogs,", function () {
        beforeEach(function () {
            cy.login({ username: "usertest", password:"pass" })
            cy.createBlog({ author: "cypress", title: "blog one", url: "url com" , likes: 10 })
            cy.createBlog({ author: "sserpyc", title: "blog two", url: "url com" , likes: 2 })
            cy.createBlog({ author: "scpyr", title: "blog four", url: "url com" , likes: 200 })
            cy.createBlog({ author: "percy s.", title: "blog three", url: "url com" , likes: 5 })
            cy.visit("http://localhost:3000")
        })
        it("blogs are ordered by likes", function () {
            cy.get("#listOfBlogs").children().each(() => {
                cy.contains("show").click()
            })
            cy.get(".likesNumber").then((likes) => {
                for (let i = 0; i < likes.length; i++) {
                    if (i !== likes.length-1) {
                        expect(likes[i].textContent >= likes[i+1].textContent)
                    }
                }
            })
            cy.log("i want die").wait(500)
        })
    })
})