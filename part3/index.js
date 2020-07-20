const express = require('express')
const morgan = require('morgan')
const { token } = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// const url =
//   `mongodb+srv://saumyafullstackopen:${password}@dang-thats-delicious-qoxqy.mongodb.net/Fullstackopen?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })

// const Person = mongoose.model('Person', personSchema)


let persons = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


morgan.token('post', function (req,res){
    if(req.method === 'POST')
         return JSON.stringify(req.body)
    else
        return ''
})

morgan.format('postFormat',':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postFormat'))

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name || !body.number){
        res.status(400).json({
            error: 'Cotent Missing'
        })
    }
    else{

        let isNamePresent = persons.find(person => person.name === body.name)
        if(isNamePresent){
            res.status(400).json({
                'error' : 'Name must be unique'
            })
        }
        else{
            let id = Math.floor(Math.random() * 9999)
            let person = {
                name : body.name,
                number: body.number,
                id
            }
            persons = persons.concat(person)
            return res.json(person)
        }
    }
})

app.get('/api/persons/:id',(req,res)=>{
    const person = persons.find(person => person.id === parseInt(req.params.id))
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    persons = persons.filter(person => person.id !== parseInt(req.params.id))
    res.status(204).end()
})

app.get('/info',(req,res)=>{
    let date = new Date()
    res.send(`Phonebook has info for ${persons.length} people <br><br> ${date}`)
})

const PORT = process.env.PORT ||3001
app.listen(PORT,()=>{
    console.log(`Successfully running on ${PORT}`)
})