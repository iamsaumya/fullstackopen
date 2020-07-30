const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/blogs", async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post("/blogs", async (request, response) => {
	const blog = new Blog(request.body)

	const savedBlog = await blog.save()
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