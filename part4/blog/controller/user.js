const  userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

userRouter.post("/", async (req,res) => {
	const body = res.body
	const salt = 10
	const passwordHash  = new bcrypt(body.password,salt)

	const user = new User({
		name: body.name,
		username: body.username,
		passwordHash
	})

	const savedUser = await user.save()

	res.json(savedUser)
})

module.exports = userRouter