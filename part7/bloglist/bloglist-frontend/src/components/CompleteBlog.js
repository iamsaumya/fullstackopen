import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const CompleteBlog = () => {
    
	const id = useParams().id;
	const blogs = useSelector((state) => {
        console.log(state)
		return state.blogs;
	});
	const blog = blogs.find((blog) => blog.id === id);

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
						// onClick={() => handleLikes(blog.id, blog.likes)}
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
