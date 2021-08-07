import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

const mockHandler = jest.fn()
const user = {
    username:"poster",
    name:"poster"
}
const blog = {
    title: "test_title",
    author: "test_author",
    url: "url",
    likes: 1234,
    user: user
}
const blogComponent =
<Blog blog={blog}
    blogLikeHandler={mockHandler}
    handleBlogRemoval={mockHandler}
    user={user}
/>

describe("a blog component",() => {
    test("renders title and author, but not url or likes", () => {
        const component = render(blogComponent)
        expect(component.container).toHaveTextContent("\"test_title\", by test_author")
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent("likes")
    })
    test("renders url and likes when button is clicked", () => {
        const component = render(blogComponent)
        const button = component.container.querySelector(".expandButton")
        expect(component.container).not.toHaveTextContent(blog.url)
        fireEvent.click(button)
        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent(blog.likes)
    })
})