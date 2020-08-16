import React, { useEffect, useRef } from "react";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Users from "./components/Users";

import blogService from "./services/blogs";
import { showNotifcation } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setLoggedUser } from "./reducers/loggedUserReducer";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

const App = () => {
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.loggedInUser);

	const blogFormRef = useRef();

	useEffect(() => {
		const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");
		if (loggedBlogUser) {
			const savedUser = JSON.parse(loggedBlogUser);
			dispatch(setLoggedUser(savedUser));
			blogService.setToken(savedUser.token);
		}
	}, [dispatch]);

	const handleLogout = async () => {
		window.localStorage.removeItem("loggedBlogUser");
		dispatch(setLoggedUser(null));
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
				<div>{loggedInUser.name} logged in</div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		);
	};

	return (
		<div>
			<Notification />
			{loggedInUser === null && <Login />}
			{loggedInUser !== null && (
				<div>
					<h2>blogs</h2>
					{logout()}
					<Switch>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/">
							<div>
								{createBlog()}
								<Blogs />
							</div>
						</Route>
					</Switch>
				</div>
			)}
		</div>
	);
};

export default App;
