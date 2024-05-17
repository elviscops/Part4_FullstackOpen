const { test, after ,beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "Blog Title",
        "author": "Blog author",
        "url": "tvnet.lv",
        "likes": 1,
        "id": "663921cd7e6e1445b3c7fbcc"
    },
    {
        "title": "Truth about Michele ",
        "author": "Barack Obama",
        "url": "Google.com",
        "likes": 2,
        "id": "663921cd723e1445b3c7fbcc"
      },
    {
        "title": "How to make a Blog",
        "author": "Me",
        "url": "https://fullstackopen.com/",
        "likes": 3,
        "id": "663d03c03ec70ae432ab9fc8"
    }
]

const newBlogData = 
    {
        "title": "America is a nation that can be defined by single word - Asssfhhhtlllmmnfff",
        "author": "Joe Biden",
        "url": "Google.com",
        "likes": 50
    }

const newBlogData1 = 
{
    "title": "How To Survive",
    "author": "Joe Mama",
    "url": "Google.com"
}

const newBlogData2 = 
{
    "author": "John Doe",
    "url": "netflix.com",
    "likes": 13
}


beforeEach( async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

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
    await api.post('/api/blogs').send(newBlogData).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(contents.includes('America is a nation that can be defined by single word - Asssfhhhtlllmmnfff'))
})


test('likes property missing, defaulting likes to 0', async () => {
    await api.post('/api/blogs').send(newBlogData1).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[response.body.length-1].likes, 0)
})


test('title property missing, returning 400', async () => {
    await api.post('/api/blogs').send(newBlogData2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

after(async () => {
    await mongoose.connection.close()
}) 