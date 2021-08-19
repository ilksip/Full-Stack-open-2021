import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

const mockLikeHandler = jest.fn()
const mockRemovalHandler = jest.fn()
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
    blogLikeHandler={mockLikeHandler}
    handleBlogRemoval={mockRemovalHandler}
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
    test("The 'like' button calls its event handler the right amount of times", () => {
        const component = render(blogComponent)
        const expand = component.container.querySelector(".expandButton")
        fireEvent.click(expand)
        const button = component.container.querySelector(".likeButton")
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})