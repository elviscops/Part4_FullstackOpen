const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

blogRouter.get('/api/blogs', async (request,response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url){
        return response.status(400).json({error: "Title or URL missing"})
    }

    const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0
    })

    const savedBlog = await blog.save()
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

    try {
        const blog = await Blog.findByIdAndDelete(id)
        response.json(blog)
    } catch (error) {
        response.status(400).json({error})
    }
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