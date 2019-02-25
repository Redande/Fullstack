import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title,
  onTitleChange,
  author,
  onAuthorChange,
  url,
  onUrlChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      title: <input value={title} onChange={onTitleChange} />
    </div>
    <div>
      author: <input value={author} onChange={onAuthorChange} />
    </div>
    <div>
      url: <input value={url} onChange={onUrlChange} />
    </div>
    <div>
      <button type="submit">create</button>
    </div>
  </form>
)

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  onAuthorChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired
}

export default BlogForm
