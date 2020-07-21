require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to ', url);

mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>{
    console.log('Connection successful!')
})
.catch(error=>{
    console.log('Connection Failed!',error.message)
})

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  number: {
      type: String,
      required: true
  }
})

personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

