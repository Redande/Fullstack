/* eslint react/prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      title: <input {...title} />
    </div>
    <div>
      author: <input {...author} />
    </div>
    <div>
      url: <input {...url} />
    </div>
    <div>
      <button type="submit">create</button>
    </div>
  </form>
)

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
