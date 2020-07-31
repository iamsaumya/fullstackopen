const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenfromRequest = (request) => {
	const authorization = request.get("authorization")
	if(authorization && authorization.toLowerCase().startsWith("bearer ")){
		return authorization.slice(7)
	}
	return null
}

blogRouter.get("/blogs", async (request, response) => {
	const blogs = await Blog.find({}).populate("user")
	response.json(blogs)
})

blogRouter.post("/blogs", async (request, response) => {
	const body = request.body

	const token = getTokenfromRequest(request)

	const decodedToken = jwt.verify(token,process.env.SECRET)

	if(!token || !decodedToken.id){
		return response.status(401).json({ error : "token missing or invalid" })
	}

	const user = await User.findById(decodedToken.id)

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
	const id = request.params.id
	await Blog.findByIdAndDelete(id)
	response.status(204).end()
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