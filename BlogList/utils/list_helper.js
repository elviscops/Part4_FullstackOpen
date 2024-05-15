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

module.exports = {
    dummy,
    totalLikes
}