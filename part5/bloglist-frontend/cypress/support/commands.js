Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3003/api/login", {
        username, password
    }).then(response => {
        localStorage.setItem("loggeduser", JSON.stringify(response.body))
    })
})

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
    const user = window.localStorage.getItem("loggeduser")
    const parsedUser = JSON.parse(user)
    const options = {
        form: false,
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        body: { title, author, url, likes },
        auth: { bearer: parsedUser.token }
    }
    cy.request(options)
})