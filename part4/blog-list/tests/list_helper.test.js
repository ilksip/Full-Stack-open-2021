const listHelper = require("../utils/list_helper")
const blog_examples = require("../utils/blog_examples")
test("dummy returns one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe("total likes are correct", () => {
    test("when list has only one blog", () => {
        const likes = listHelper.totalLikes(blog_examples.oneBlog)
        expect(likes).toBe(7)
    })
    test("when list has zero blogs", () => {
        const likes = listHelper.totalLikes(blog_examples.noBlogs)
        expect(likes).toBe(0)
    })
    test("when there are multiple blogs", () => {
        const likes = listHelper.totalLikes(blog_examples.all)
        expect(likes).toBe(36)
    })
})