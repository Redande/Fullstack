import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  handleLikeClick,
  handleRemoveClick,
  currentUser
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpansion = () => {
    setExpanded(!expanded)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleExpansion}>
        {expanded ?
          <div>
            <p>{blog.title} {blog.author}</p>
            <a href={'http://' + blog.url}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={() => handleLikeClick(blog)}>like</button></p>
            <p>added by {blog.user.name}</p>
            {currentUser.username === blog.user.username && <button onClick={() => handleRemoveClick(blog)}>remove</button>}
          </div> :
          <div>{blog.title} {blog.author}</div>
        }

      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  }),
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
}

export default Blog
