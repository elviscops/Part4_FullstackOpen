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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}