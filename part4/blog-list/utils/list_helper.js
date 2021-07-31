
const _ = require("lodash");
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (acc, cur) => acc + cur.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, cur) => (acc.likes > cur.likes) ? acc : cur
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, {likes: 0})
}

const mostBlogs = (blogs) => {
    const result = _(blogs)
        .groupBy("author")
        .map((value, key) => {
            const author = {author: key, blogs: value.length}
            return author
        })
        .reduce((acc, cur) => (acc.blogs > cur.blogs) ? acc : cur)
    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}