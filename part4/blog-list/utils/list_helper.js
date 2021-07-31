// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (acc, cur) => acc + cur.likes
    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy, totalLikes
}