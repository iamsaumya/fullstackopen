const mongoose = require("mongoose")

const userSchema = mongoose.userSchema({
	username: String,
	passwordHash: String,
	name: String,
	blogs : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog"
	}]
})

userSchema.set("toJSON",{
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

module.exports = mongoose.model("User",userSchema)