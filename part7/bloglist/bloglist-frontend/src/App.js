import React, { useState, useEffect, useRef } from "react";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

import blogService from "./services/blogs";
import { showNotifcation } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const blogFormRef = useRef();

	const handleLogout = async () => {
		window.localStorage.removeItem("loggedBlogUser");
		dispatch(setUser(null));
	};

	const addBlogs = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			dispatch(setBlogs(blogObject));
			dispatch(
				showNotifcation(
					`a new blog ${blogObject.title} by ${blogObject.author}`,
					5
				)
			);
		} catch (exception) {
			dispatch(showNotifcation(exception.response.data.error, 5));
			console.error(exception);
		}
	};

	useEffect(() => {
		const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");
		if (loggedBlogUser) {
			const user = JSON.parse(loggedBlogUser);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

	const createBlog = () => {
		return (
			<Togglable buttonLabel="Create Blog" ref={blogFormRef}>
				<BlogForm addBlogs={addBlogs} />
			</Togglable>
		);
	};

	const logout = () => {
		return (
			<div>
				<div>{user.name} logged in</div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		);
	};

	return (
		<div>
			<Notification />
			{user === null && <Login />}
			{user !== null && (
				<div>
					<h2>blogs</h2>
					{logout()}
					{createBlog()}
					<Blogs />
				</div>
			)}
		</div>
	);
};

export default App;
