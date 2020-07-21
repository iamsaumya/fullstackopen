require('dotenv').config()
const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connection successful!'))
	.catch(error => {
		console.log('Connection Failed!',error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true,'Why no name?'],
		unique: true,
		minlength: [3,'Name must have atleast 3 characters']
	},
	number: {
		type: String,
		required: [true,'Why no number?'],
		minlength: [8,'Number must have atleast 8 characters']
	}
})

personSchema.set('toJSON',{
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

personSchema.plugin(uniqueValidator)
mongoose.set('useCreateIndex', true)


module.exports = mongoose.model('Person', personSchema)

