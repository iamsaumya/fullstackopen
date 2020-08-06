const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogRouter.get("/blogs", async (request, response) => {
	const blogs = await Blog.find({}).populate("user")
	response.json(blogs)
})

blogRouter.post("/blogs", async (request, response) => {
	const body = request.body

	const token = request.token

	const decodedToken = jwt.verify(token,process.env.SECRET)

	if(!token || !decodedToken.id){
		return response.status(401).json({ error : "token missing or invalid" })
	}

	const user = await User.findById(decodedToken.id)

	if(!body.title || !body.url){
		return response.status(400).json({ error: "title or url is missing" })
	}

	const blog = new Blog({
		title : body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogRouter.delete("/blogs/:id",async(request,response) => {
	const token = request.token

	const decodedToken = jwt.verify(token,process.env.SECRET)
	if(!token || !decodedToken){
		return response.status(401).json({
			error: "token missing or invalid"
		})
	}

	const id = request.params.id
	const blog = await Blog.findById(id)
	if(blog.user.toString() === decodedToken.id){
		await Blog.findByIdAndDelete(id)
		response.status(204).end()
	}
	else{
		return response.status(401).json({
			error: "Unauthorized to delete the blog"
		})
	}
})

blogRouter.patch("/blogs/:id", async(request,response) => {
	const id = request.params.id

	if(request.body.likes){
		const blog = {
			likes : request.body.likes
		}
		const updatedBlog = await Blog.findByIdAndUpdate(id,blog,{ new : true })
		response.json(updatedBlog)
	}
	else{
		response.status(400).send({ error: "Likes property is missing" })
	}
})

module.exports = blogRouter