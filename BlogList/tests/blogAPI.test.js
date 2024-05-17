const { test, after ,beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const Blog = require('../models/blog')
const api = supertest(app)
const listHelper = require('../utils/list_helper')

describe('Noted are initially saved', ()=>{

    beforeEach( async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(listHelper.initialBlogs)
        
    })

    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('correct number of blog posts', async () => {
        const response = await api.get('/api/blogs')  
        assert.strictEqual(response.body.length, 3)
    })
  
    test('strcture has id field', async () => {
        const response = await api.get('/api/blogs')  
        assert(response.body[0].hasOwnProperty("id"))
    })

    test('blog post can be added', async () => {
        await api.post('/api/blogs').send(listHelper.newBlogData).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
    
        assert.strictEqual(response.body.length, listHelper.initialBlogs.length + 1)
        assert(contents.includes('America is a nation that can be defined by single word - Asssfhhhtlllmmnfff'))
    })

    test('blog post can be deleted', async () => {
        const postResponse = await api.post('/api/blogs').send(listHelper.newBlogData3)  
        const response = await api.get(`/api/blogs/${postResponse.body.id}`) 
        await api.delete(`/api/blogs/${response.body.id}`).expect(200)
    })


    test('blog likes can be updated', async () => {

        const response = await api.get(`/api/blogs`) 
        const contents = response.body
        await api.put(`/api/blogs/${contents[response.body.length-1].id}`).send({ likes: 666})
        const newResponse = await api.get(`/api/blogs/${contents[response.body.length-1].id}`)
        assert.strictEqual(newResponse.body.likes, 666)
    })

})

describe('Checking for data errors', ()=>{

    test('likes property missing, defaulting likes to 0', async () => {
        await api.post('/api/blogs').send(listHelper.newBlogData1).expect(201).expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[response.body.length-1].likes, 0)
    })

    test('title property missing, returning 400', async () => {
        await api.post('/api/blogs').send(listHelper.newBlogData2)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
})


after(async () => {
    await mongoose.connection.close()
}) 