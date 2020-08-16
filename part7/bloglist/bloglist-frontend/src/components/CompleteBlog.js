import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addLike} from '../reducers/blogReducer'

const CompleteBlog = () => {
    const dispatch = useDispatch()
	const id = useParams().id;
	const blogs = useSelector((state) => {
		console.log(state);
		return state.blogs;
	});
	const blog = blogs.find((blog) => blog.id === id);

	const handleLikes = (id, likes) => {
        dispatch(addLike(id,likes+1))
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
			</div>
		</div>
	);
};

export default CompleteBlog;
