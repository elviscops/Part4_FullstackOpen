const _ = require('lodash'); 
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Blog Title",
        "author": "Blog author",
        "url": "tvnet.lv",
        "likes": 1
    },
    {
        "title": "Truth about Michele ",
        "author": "Barack Obama",
        "url": "Google.com",
        "likes": 2
      },
    {
        "title": "How to make a Blog",
        "author": "Me",
        "url": "https://fullstackopen.com/",
        "likes": 3
    }
]

const newBlogData = {
    "title": "America is a nation that can be defined by single word - Asssfhhhtlllmmnfff",
    "author": "Joe Biden",
    "url": "Google.com",
    "likes": 50
}

const newBlogData1 = {
    "title": "How To Survive",
    "author": "Joe Mama",
    "url": "Google.com"
}

const newBlogData2 = {
    "author": "John Doe",
    "url": "netflix.com",
    "likes": 13
}

const newBlogData3 = {
    "title": "How To Delete",
    "author": "Joe Mama",
    "url": "Google.com"
}


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likeCount = 0;
    blogs.map( i => {
        likeCount = likeCount + i.likes
    })
    return likeCount
}

const favouriteBlog = (blogs) => {

    let bestBlog
    let maxIndex = 0
    
    for (let i = 1; i < blogs.length; i++) { 
        if (blogs[i].likes > blogs[maxIndex].likes) { 
            maxIndex = i; 
        } 
    } 

    bestBlog = blogs[maxIndex]
    delete bestBlog.id;
    delete bestBlog.url;
    delete bestBlog.__v;
     
return bestBlog
}

const mostBlogs = (blogs) => {

    let mostBlogs = 0
    let mostBlogskey
    const nameCounts = _.countBy(blogs, (item) => item.author)
    Object.entries(nameCounts).map(([k,v],i) => {
        if (v>mostBlogs){
            mostBlogs = i
            mostBlogskey = k
        } 
    })

    return { author: mostBlogskey, blogs: nameCounts[mostBlogskey]};
}

const mostLikes = (blogs) => {

    let mostLikeskey
    let mostLikesIndex = 0

    const authorLikes = _.reduce(blogs, (acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    Object.entries(authorLikes).map(([k,v],i) => {
        if (v>mostLikesIndex){
            mostLikesIndex = i
            mostLikeskey = k
        } 
    })
  return { author: mostLikeskey, likes: authorLikes[mostLikeskey]};
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    newBlogData,
    newBlogData1,
    newBlogData2,
    newBlogData3,
    usersInDb
    
}