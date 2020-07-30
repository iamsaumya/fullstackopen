const logger = require("./logger")

const unknownendpoint = (req,res) => {
	res.status(404).send({ error:"unkown endpoint" })
}

const errorHandler = (error,req,res,next) => {
	logger.error(error.message)
	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message })
	}
	next(error)
}

module.exports = {
	unknownendpoint,
	errorHandler
}