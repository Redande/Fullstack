import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const blogToLike = state.find(b => b.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : likedBlog)
    case 'REMOVE_BLOG':
        return state.filter(b => b.id !== action.data.id)
    default:
        return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = blog => {
  const id = blog.id

  const blogObject = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    await blogService.update(id, blogObject)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export default reducer
