const  userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

function signupValidation(body){
	const password = body.password
	const username = body.username

	if(password === undefined || username === undefined){
		return "Username or Password missing"
	}
	else if(password.length < 3){
		return "Password must be atleast 3 characters long"
	}
	else if(username.length <3){
		return "Username must be atleast 3 characters long"
	}
	return undefined
}
userRouter.post("/", async (req,res) => {
	const body = req.body

	const validationMessage = signupValidation(body)
	if(validationMessage){
		return res.status(400).send({ error: validationMessage })
	}

	const salt = 10
	const passwordHash  = await bcrypt.hash(body.password,salt)

	const user = new User({
		name: body.name,
		username: body.username,
		passwordHash
	})

	const savedUser = await user.save()

	return res.status(201).json(savedUser)
})

userRouter.get("/", async (req,res) => {
	const users = await User.find({}).populate("blogs")
	return res.json(users)
})
module.exports = userRouter