const dummy = () => 1

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    const authors = {}
    let max = blogs[0]
    blogs.forEach((blog) => {
        if (authors[blog.author] === undefined) {
            authors[blog.author] = 0
        }
        authors[blog.author] += 1
        if (authors[blog.author] > authors[max.author]) {
            max = blog
        }
    })
    return (
        {
            author: max.author,
            blogs: authors[max.author]
        }
    )
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    const likes = {}
    let max = blogs[0]
    blogs.forEach((blog) => {
        if (likes[blog.author] === undefined) {
            likes[blog.author] = 0
        }
        likes[blog.author] += blog.likes
        if (likes[blog.author] > likes[max.author]) {
            max = blog
        }
    })
    return (
        {
            author: max.author,
            likes: likes[max.author]
        }
    )
}

module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
}
