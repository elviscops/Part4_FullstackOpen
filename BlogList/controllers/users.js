const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

userRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('blogs',{url: 1, title: 1, author: 1})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({error: "Username or password too short"})
    }

    if (!username || !password){
        return response.status(400).json({error: "Username or password missing"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
            username,
            name,
            passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})

module.exports = userRouter