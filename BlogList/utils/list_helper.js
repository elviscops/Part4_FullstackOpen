const _ = require('lodash'); 

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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}