const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({}).populate('user',{ name: 1, username: 1})
    response.status(200).json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body 
    const user = request.user

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

blogRouter.get('/:id', async (request,response) => {
    const id = request.params.id
    try {
        const blog = await Blog.findById(id)
        response.json(blog)
    } catch (error) {
        response.status(400).json({error})
    }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request,response) => {
    const id = request.params.id
    const user = request.user

    const blog = await Blog.findById(id)
    
    if (user.id === blog.user.toString()){
        blogToDelete = await Blog.findByIdAndDelete(id)
        response.json(blogToDelete)
    } else {
        response.status(400).json({ error: 'Invalid user trying to delete blog' }) 
    }
    response.status(200).end()

})

blogRouter.put('/:id', async (request,response) => {
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