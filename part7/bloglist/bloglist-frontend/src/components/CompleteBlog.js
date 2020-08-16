import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";
import {showNotifcation} from "../reducers/notificationReducer"
const CompleteBlog = () => {
	const dispatch = useDispatch();
	const id = useParams().id;
	const blogs = useSelector((state) => {
		console.log(state);
		return state.blogs;
	});
	const blog = blogs.find((blog) => blog.id === id);

	const handleLikes = (id, likes) => {
		dispatch(addLike(id, likes + 1));
	};

	const handleRemoving = async (blog) => {
		const result = window.confirm(`Remove ${blog.title} by ${blog.author}`);

		if (result) {
			try {
                dispatch(deleteBlog(blog.id));
                window.location.href = '/'; 
            } catch (exception) {
				dispatch(showNotifcation(exception.response.data.error, 5));
			}
		}
	};

	if (!blog) {
		console.log(blog);
		return null;
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<div>
				<a href={blog.url}>{blog.url}</a>
				<p>
					{blog.likes}{" "}
					<button
						className="like"
						onClick={() => handleLikes(blog.id, blog.likes)}
					>
						like
					</button>
				</p>
				<p>{`added by ${blog.author}`}</p>
                <button onClick={() => handleRemoving(blog)}>Remove</button>
			</div>
		</div>
	);
};

export default CompleteBlog;