const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/api/users', async (request,response) => {
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/api/users', async (request, response) => {
    const {username, name, password} = request.body

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

// userRouter.get('/api/blogs/:id', async (request,response) => {
//     const id = request.params.id

//     try {
//         const user = await User.findById(id)
//         response.json(user)
//     } catch (error) {
//         response.status(400).json({error})
//     }
// })

// userRouter.delete('/api/blogs/:id', async (request,response) => {
//     const id = request.params.id

//     try {
//         const blog = await Blog.findByIdAndDelete(id)
//         response.json(blog)
//     } catch (error) {
//         response.status(400).json({error})
//     }
// })

// userRouter.put('/api/blogs/:id', async (request,response) => {
//     const id = request.params.id

//     const updateLikes = {
//         likes: request.body.likes
//     }

//     try {
//         const updatedBlog = await Blog.findByIdAndUpdate(id,updateLikes,{ new: true })
//         response.json(updatedBlog)
//     } catch (error) {
//         response.status(400).json({error})
//     }

// })

module.exports = userRouter