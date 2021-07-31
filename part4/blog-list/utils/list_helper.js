
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
    console.log(result)
    return result
}

const mostLikes = (blogs) => {
    const sortByAuthor = _.groupBy(blogs, "author")
    const likes = _.map(sortByAuthor, (val, key) => {
        const likes = _.reduce(val, (acc, cur) => acc + cur.likes, 0)
        return {author: key, likes}
    })
    const mostLiked = _.reduce(likes, (acc, cur) => (acc.likes > cur.likes) ? acc : cur)
    return mostLiked
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}