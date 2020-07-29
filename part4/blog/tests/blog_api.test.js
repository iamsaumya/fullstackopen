const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

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

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = initialBlogs.map((blog) => new Blog(blog))
	const blogPromises = blogObjects.map((blog) => blog.save())
	await Promise.all(blogPromises)
})

test("verify GET /api/blogs endpoint", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type",/application\/json/)

	expect(response.body.length).toBe(3)
})

afterAll(() => {
	mongoose.connection.close()
})