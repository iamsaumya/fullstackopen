import React from "react";
import "@testing-library/react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("test for new blog form", () => {
    const addBlogs = jest.fn()

    const component = render(
        <BlogForm addBlogs={addBlogs}/>
    )
    
    const title = component.container.querySelector("#title")
    const url = component.container.querySelector("#url")
    const author = component.container.querySelector("#author")
    const likes = component.container.querySelector("#likes")
    const form = component.container.querySelector('form')
    fireEvent.change(title,{
        target: {value: 'testing the blogform'}
    })

    fireEvent.change(url,{
        target: {value: 'www.testing.com'}
    })

    fireEvent.change(author,{
        target: {value: 'Master ninja'}
    })

    fireEvent.change(likes,{
        target: {value: 4}
    })

    fireEvent.submit(form)

    expect(addBlogs.mock.calls).toHaveLength(1)
    expect(addBlogs.mock.calls[0][0].title).toBe('testing the blogform')
    expect(addBlogs.mock.calls[0][0].url).toBe('www.testing.com')
    expect(addBlogs.mock.calls[0][0].author).toBe('Master ninja')
    expect(addBlogs.mock.calls[0][0].likes).toBe('4')
})
    