import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { showNotifcation } from "../reducers/notificationReducer";
import CompleteBlog from "./CompleteBlog";

const Blogs = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	// const handleLikes = async (id, likes) => {
	// 	await blogService.updateBlog({
	// 		id: id,
	// 		likes: likes + 1,
	// 	});
	// 	setUpdate(Math.floor(Math.random() * 1000));
	// };

	// const handleRemoving = async (blog) => {
	// 	const result = window.confirm(`Remove ${blog.title} by ${blog.author}`);

	// 	if (result) {
	// 		try {
	// 			await blogService.removeBlog({
	// 				id: blog.id,
	// 			});
	// 			setUpdate(Math.floor(Math.random() * 100));
	// 		} catch (exception) {
	// 			dispatch(showNotifcation(exception.response.data.error, 5));
	// 		}
	// 	}
	// };

	return (
		<div>
			{blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
				blogs.map((blog) => (
					<div key={blog.id} style={blogStyle}>
						<a href={`/blogs/${blog.id}`}>{blog.title}</a>
					</div>
				))}
		</div>
	);
};

export default Blogs;
