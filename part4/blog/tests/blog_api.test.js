const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test.helper")

beforeAll(async () => {
	await User.deleteMany({})
	const user = {
		"username" : "tester",
		"name" : "Testing",
		"password" : "testing"
	}

	await api
		.post("/api/users")
		.send(user)
		.set("Accept","application/json")
		.expect("Content-Type",/application\/json/)
})

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
	const loginUser = {
		"username" : "tester",
		"password": "testing"
	}
	const loggedUser = await api
		.post("/api/login")
		.send(loginUser)
		.set("Accept","application/json")
		.expect("Content-Type",/application\/json/)

	const blog = {
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 9
	}
	await api
		.post("/api/blogs")
		.send(blog)
		.set("Authorization",`Bearer ${loggedUser.body.token}`)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(201)

	const blogs = await helper.getBlogsInDB()
	const titles = blogs.map((blog) => blog.title)
	expect(titles).toContain("TDD harms architecture")
	expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test("verify if likes property is missing then it defaults to 0",  async() => {
	const loginUser = {
		"username" : "tester",
		"password": "testing"
	}
	const loggedUser = await api
		.post("/api/login")
		.send(loginUser)
		.set("Accept","application/json")
		.expect("Content-Type",/application\/json/)

	const blog = {
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	}

	const response = await api
		.post("/api/blogs")
		.send(blog)
		.set("Authorization",`Bearer ${loggedUser.body.token}`)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(201)

	expect(response.body.likes).toBeDefined()
	expect(response.body.likes).toBe(0)
})

test("verify if the POST /api/blogs requires title and url in the body", async () => {
	const loginUser = {
		"username" : "tester",
		"password": "testing"
	}
	const loggedUser = await api
		.post("/api/login")
		.send(loginUser)
		.set("Accept","application/json")
		.expect("Content-Type",/application\/json/)


	const blog = {
		author: "Robert C. Martin",
		likes: 9
	}
	const response = await api
		.post("/api/blogs")
		.send(blog)
		.set("Accept","application/json")
		.set("Authorization",`Bearer ${loggedUser.body.token}`)
		.expect(400)

	expect(response.body.error).toBe("title or url is missing")
})

test("verify if the POST /api/blogs only works when authorized",async () => {
	const blog = {
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 9
	}

	const response = await api
		.post("/api/blogs")
		.send(blog)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(401)

	expect(response.body.error).toBe("jwt must be provided")
})

afterAll(() => {
	mongoose.connection.close()
})