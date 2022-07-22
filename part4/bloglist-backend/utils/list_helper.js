const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((acc, val) => {
        return val.likes > acc.likes
            ? val
            : acc
    })

    const favoriteObject = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }

    return favoriteObject
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Create an array of the authors' names
    const writerNames = []
    for (const blog of blogs) {
        writerNames.push(blog.author)
    }

    // Count how many times each name appears in the array
    // This represents how many blogs each author has written
    const blogCounts = _.countBy(writerNames)

    // Find the blogger with the highest amount of blogs written
    let topBlogger = {
        author: '',
        blogs: 0
    }

    for (const author in blogCounts) {
        if (blogCounts[author] > topBlogger.blogs) {
            topBlogger.author = author
            topBlogger.blogs = blogCounts[author]
        }
    }

    return topBlogger
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Group each object according to author
    const groupedByAuthor = _.groupBy(blogs, o => o.author)
    console.log(groupedByAuthor)

    // Reduce objects grouped by author into a sum of the author's likes
    const bloggerLikes = {}
    for (const author in groupedByAuthor) {
        const likes = groupedByAuthor[author].reduce((acc, val) => val.likes + acc, 0)
        bloggerLikes[author] = likes
    }

    let topLikedBlogger = {
        author: '',
        likes: 0
    }

    for (const author in bloggerLikes) {
        if (bloggerLikes[author] > topLikedBlogger.likes) {
            topLikedBlogger.author = author
            topLikedBlogger.likes = bloggerLikes[author]
        }
    }

    return topLikedBlogger
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

