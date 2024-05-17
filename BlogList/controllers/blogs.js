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

module.exports = blogRouter