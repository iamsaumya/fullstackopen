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
	else if(error.name === "JsonWebTokenError"){
		return res.status(401).json({ error: error.message })
	}
	next(error)
}

const tokenExtractor = (req,res,next) => {
	const authorization = req.get("authorization")
	if(authorization && authorization.toLowerCase().startsWith("bearer ")){
		req.token =  authorization.slice(7)
		return next()
	}
	req.token =  null
	return next()
}

module.exports = {
	unknownendpoint,
	errorHandler,
	tokenExtractor
}