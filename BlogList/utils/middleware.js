const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.name)
    logger.error(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        response.status(401).json({ error: 'token invalid'})
    } else if (error.name === 'TokenExpiredError') {
        response.status(401).json({error: 'token expired'})
    } 

    next(error)
}

const tokenExtractor = (request, response, next) => {

    let token = null
    const authorization = request.get('Authorization')
    
    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.replace('Bearer ', '')
    }
    request.token = token
    next()
}

const userExtractor = async (request, response, next) => {

    console.log(request.token)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log(decodedToken)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token invalid' }) 
    }
    const user = await User.findById(decodedToken.id)  
    console.log("Useeer ",user)

    request.user = user

    next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}