const morgan = require("morgan")
//eslint-disable-next-line
morgan.token("body", (req, res) => {
    if (req.method === "POST" || req.method === "PUT") {
        return JSON.stringify(req.body)
    }
    return " "
})

module.exports = morgan(":method :url :status :res[content-length] - :response-time ms :body")