import React from 'react'
import { connect } from 'react-redux';
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useField } from '../hooks'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  border: solid grey;
  border-width: 1;
  margin-bottom: 5;
  border-radius: 3px;
`

const Blogs = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.textField.value,
      author: author.textField.value,
      url: url.textField.value
    }

    props.setNotification(
      `a new blog ${title.textField.value} by ${author.textField.value} added`,
      10,
      'success'
    )

    props.createBlog(blogObject)
    title.reset()
    author.reset()
    url.reset()
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm
        title={title.textField}
        author={author.textField}
        url={url.textField}
        onSubmit={addBlog}
      />
    </Togglable>
  )

  if (props.user === null) {
    return null
  }

  return (
    <div>
      {blogForm()}

      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <StyledLink key={blog.id} className="blogContainer">
          <Link key={blog.id} to={`/blogs/${blog.id}`} id={'blogtitle'}>
            {blog.title}
          </Link>
        </StyledLink>
      )}
    </div>
  )
}

const mapStateToProps = state => (
  {
    blogs: state.blogs,
    user: state.login,
  }
)

const mapDispatchToProps = {
  createBlog,
  likeBlog,
  removeBlog,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
