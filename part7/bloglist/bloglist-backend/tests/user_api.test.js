const mongoose = require("mongoose")
const superset = require("supertest")
const app = require("../app")
const api = superset(app)
const User = require("../models/user")
const helper = require("./test.helper")

beforeEach(async () => {
	await User.deleteMany({})
	const userObjects = helper.initialUsers.map(user => new User(user))
	const userPromises = userObjects.map(user => user.save())
	await Promise.all(userPromises)
})

test("test posting a user on /api/users endpoint", async() => {
	const user = {
		username : "testusername",
		name: "I am test",
		password: "testpassword"
	}

	await api
		.post("/api/users")
		.send(user)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(201)


	const users = await helper.getUsersInDB()
	const username = users.map(user => user.username)

	expect(users).toHaveLength(helper.initialUsers.length + 1)
	expect(username).toContain(user.username)

})
test("test validation of /POST /api/users endpoint", async () => {
	const user = {
		username : "testusername",
		name: "I am test"
	}

	const response = await api
		.post("/api/users")
		.send(user)
		.set("Accept","application/json")
		.expect("Content-Type",/json/)
		.expect(400)
	expect(response.body.error).toBe("Username or Password missing")
})

afterAll(() => {
	mongoose.connection.close()
})