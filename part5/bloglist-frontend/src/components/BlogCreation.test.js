import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogCreation from "./BlogCreation"

test("Form calls the event handler with correct details", () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogCreation handleBlogCreation={createBlog}/>
    )
    const title = component.container.querySelector("#title")
    fireEvent.change(title, {
        target: { value: "test_title" }
    })
    const author = component.container.querySelector("#author")
    fireEvent.change(author, {
        target: { value: "test_author" }
    })
    const url = component.container.querySelector("#url")
    fireEvent.change(url, {
        target: { value: "test_url" }
    })
    const form = component.container.querySelector("form")
    fireEvent.submit(form)
    const details = createBlog.mock.calls[0][0]
    expect(details.title).toBe("test_title")
    expect(details.author).toBe("test_author")
    expect(details.url).toBe("test_url")
})

