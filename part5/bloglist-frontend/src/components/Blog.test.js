import React from "react";
import "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import { render, fireEvent } from "@testing-library/react";
import blogService from '../services/blogs'
import BlogForm from "./BlogForm";

describe("<Blog/>", () => {
	let component;
	let sampleBlog = {
		likes: 8,
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		user: "5f282041d7c32d195801e464",
	};
    
	let mockHandler = jest.fn()

	blogService.updateBlog = jest.fn().mockImplementation(() => {
		return Promise.resolve({"success": true})
	})

	beforeEach(() => {
		component = render(<Blog blog={sampleBlog} handleLikes={mockHandler}/>);
    });
    
	test("the component is displaying blog title and author by default", () => {
        expect(component.container).toHaveTextContent(sampleBlog.title)
		expect(component.container).toHaveTextContent(sampleBlog.author)
		expect(component.container).not.toHaveTextContent(sampleBlog.likes)
		expect(component.container).not.toHaveTextContent(sampleBlog.url)

    });

	test("the component is displaying url and likes after clicking button",() => {
		const button = component.getByText('view')
		fireEvent.click(button)

		expect(component.container).toHaveTextContent(sampleBlog.likes)
		expect(component.container).toHaveTextContent(sampleBlog.url)
	})

	test("if the like button is clicked twice, the event handler should be called twice",() => {
		
		const viewButton = component.getByText('view')
		fireEvent.click(viewButton)
		
		const likeButton = component.getByText("like")

		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
});
