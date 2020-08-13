const _ = require("lodash")

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if(blogs.length === 0)
		return 0

	return blogs.reduce((sum,blog) => sum += blog.likes,0)
}

const favoriteBlog = (blogs) => {
	if(blogs.length === 0)
		return {}
	return blogs.reduce((last_blog,current_blog) => current_blog.likes > last_blog.likes ? current_blog : last_blog)
}


function mostiteratee(blog){
	return blog.author
}

const mostLikes = (blogs) => {
	if(blogs.length === 0){
		return {}
	}
	const groupedBlogs = _.groupBy(blogs,mostiteratee)
	const blogsByLikes = _.mapValues(groupedBlogs,totalLikes)
	const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a,b) => a[1] > b[1] ? a : b)
	return { "author":mostLikedAuthor[0],"likes":mostLikedAuthor[1] }
}

const mostBlogs = (blogs) => {
	if(blogs.length === 0){
		return {}
	}
	const groupedBlogs = _.groupBy(blogs,mostiteratee)
	const blogsByAuthors = _.mapValues(groupedBlogs,(o) => o.length)
	const mostBlog = Object.entries(blogsByAuthors).reduce((a,b) => a[1] > b[1] ? a : b)
	return { "author" : mostBlog[0], "blogs": mostBlog[1] }
}
module.exports = { dummy,totalLikes,favoriteBlog, mostLikes, mostBlogs }