const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5
	},
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12
	}
]

const initialUsers = [
	{
		username: "hurrdog",
		name: "Plake Hunter",
		password: "thisispassword"
	},
	{
		username: "ninjamaster",
		name: "Naruto Hokage",
		password: "thisispassword"
	}
]
const getBlogsInDB = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}
const getUsersInDB = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}
module.exports = {
	initialBlogs,
	getBlogsInDB,
	getUsersInDB,
	initialUsers
}