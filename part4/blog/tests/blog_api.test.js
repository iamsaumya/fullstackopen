const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test.helper")

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
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

test("verify GET /api/blogs sanity", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type",/application\/json/)
	expect(response.body[0].id).toBeDefined()
	expect(response.body[0]._id).toBe(undefined)
})

test("verify POST /api/blogs adding a blog", async () => {
	const blog = {
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 9
	}
	await api
		.post("/api/blogs")
		.send(blog)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(201)

	const blogs = await helper.getBlogsInDB()
	const titles = blogs.map((blog) => blog.title)
	expect(titles).toContain("TDD harms architecture")
	expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test("verify if likes property is missing then it defaults to 0",  async() => {
	const blog = {
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	}

	const response = await api
		.post("/api/blogs")
		.send(blog)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(201)

	expect(response.body.likes).toBeDefined()
	expect(response.body.likes).toBe(0)
})

test("verify if the POST /api/blogs requires title and url in the body", async () => {
	const blog = {
		author: "Robert C. Martin",
		likes: 9
	}
	await api
		.post("/api/blogs")
		.send(blog)
		.set("Accept","application/json")
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})