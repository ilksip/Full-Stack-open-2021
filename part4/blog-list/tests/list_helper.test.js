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
describe("favoriteBlog()", () => {
    test("returns null when list is empty", () => {
        const blog = listHelper.favoriteBlog(blog_examples.noBlogs)
        expect(blog).toBe(0)
    })
    test("returns the blog with most likes", () => {
        const expectedBlog = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
        const blog = listHelper.favoriteBlog(blog_examples.all)
        expect(blog).toEqual(expectedBlog)
    })
})