import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("renders title and author, but not url or likes", () => {
    const mockHandler = jest.fn()
    const blog = {
        title: "test_title",
        author: "test_author",
        url: "url",
        likes: 1,
        user: {
            name:"poster"
        }
    }

    const component = render(
        <Blog blog={blog}
            blogLikeHandler={mockHandler}
            handleBlogRemoval={mockHandler}
            user={{ username: "username" }}/>
    )
    expect(component.container).toHaveTextContent("\"test_title\", by test_author")
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent("likes")
})