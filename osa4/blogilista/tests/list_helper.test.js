const listHelper = require('../utils/list_helper')
const helper = require('../utils/test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns most liked blog', () => {
    const blogs = helper.initialBlogs
    const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes))
    const mostLikedBlog = listHelper.favoriteBlog(blogs)

    expect(mostLikedBlog.likes).toBe(mostLikes)
  })

  test('returns null if list is empty', () => {
    const mostLikedBlog = listHelper.favoriteBlog([])

    expect(mostLikedBlog).toBeNull()
  })
})

describe('most blogs', () => {
  test('returns null if list is empty', () => {
    const mostBlogs = listHelper.mostBlogs([])

    expect(mostBlogs).toBeNull()
  })

  test('returns the author with highest blog count', () => {
    const mostBloggedAuthor = listHelper.mostBlogs(helper.initialBlogs)

    expect(mostBloggedAuthor.author).toBe('Robert C. Martin')
    expect(mostBloggedAuthor.blogs).toBe(3)
  })
})
