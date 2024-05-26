const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../utils/middleware')


blogRouter.get('/api/blogs', async (request,response) => {
    const blogs = await Blog.find({}).populate('user',{ name: 1, username: 1})

    response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {


    const body = request.body 

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token invalid' }) 
    }
    const user = await User.findById(decodedToken.id)    

    if (!body.title || !body.url){
        return response.status(400).json({error: "Title or URL missing"})
    }

    const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0
    })

    blog.user = user.id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)

    
})

blogRouter.get('/api/blogs/:id', async (request,response) => {
    const id = request.params.id

    try {
        const blog = await Blog.findById(id)
        response.json(blog)
    } catch (error) {
        response.status(400).json({error})
    }
})

blogRouter.delete('/api/blogs/:id', async (request,response) => {
    const id = request.params.id

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({ error: 'token invalid' }) 
    }

    const userTokenId = decodedToken.id

    const blog = await Blog.findById(id)
    
    if (userTokenId === blog.user.toString()){
        blogToDelete = await Blog.findByIdAndDelete(id)
        response.json(blogToDelete)
    } else {
        response.status(400).json({ error: 'Invalid user trying to delete blog' }) 
    }
    response.status(200).end()

})

blogRouter.put('/api/blogs/:id', async (request,response) => {
    const id = request.params.id

    const updateLikes = {
        likes: request.body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id,updateLikes,{ new: true })
        response.json(updatedBlog)
    } catch (error) {
        response.status(400).json({error})
    }

})

module.exports = blogRouter