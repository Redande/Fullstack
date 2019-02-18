const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === mostLikes)
  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const mostBloggedAuthor = _.max(blogs.map(blog => blog.author))
  const blogCount = blogs.filter(blog => blog.author === mostBloggedAuthor).length

  return { author: mostBloggedAuthor, blogs: blogCount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
