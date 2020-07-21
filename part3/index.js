require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


morgan.token('post', function (req){
	if(req.method === 'POST')
		return JSON.stringify(req.body)
	else
		return ''
})

morgan.format('postFormat',':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postFormat'))

app.get('/api/persons',(req,res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons)
		})
})

app.post('/api/persons',(req,res,next) => {
	const body = req.body
	if(!body.name || !body.number){
		res.status(400).json({
			error: 'Name or Number Missing'
		})
	}
	else
	{
		let person = new Person({
			name : body.name,
			number: body.number,
		})

		person
			.save()
			.then(savedPerson => {
				return savedPerson.toJSON()
			})
			.then(savedandFormattedPerson => res.json(savedandFormattedPerson))
			.catch(error => next(error))
	}
})

app.get('/api/persons/:id', (req,res,next) => {
	Person
		.findById(req.params.id)
		.then(person => {
			if(person){
				res.json(person)
			}
			else{
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})


app.delete('/api/persons/:id', (req,res,next) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.get('/info', async (req,res) => {
	let date = new Date()
	let persons = await Person.find({})
	res.send(`Phonebook has info for ${persons.length} people <br><br> ${date}`)
})

app.put('/api/persons/:id',(req,res,next) => {
	Person
		.findOneAndUpdate({ _id:req.params.id },req.body,{
			new:true,
			runValidators:true
		})
		.then((result) => {
			res.json(result)
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (req,res) => {
	res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'Malformatted ID' })
	}
	else if (error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
	console.log(`Successfully running on ${PORT}`)
})