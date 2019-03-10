/* eslint react/prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  background: white;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid black;
  border-radius: 3px;
`

const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      title: <input {...title} id={'title'} />
    </div>
    <div>
      author: <input {...author} id={'author'} />
    </div>
    <div>
      url: <input {...url} id={'url'} />
    </div>
    <div>
      <Button id="create" type="submit">create</Button>
    </div>
  </form>
)

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm
