import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Header = styled.h1`
  padding: 1rem;
`

const Container = styled.div`
  padding-left: 2rem;
`

const Button = styled.button`
  background: white;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid black;
  border-radius: 3px;
`

const RemoveButton = styled(Button)`
  border-color: red;
`

const Blog = props => {
  const blog = props.blog

  const removeBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.setNotification(
        `removed ${blog.title} by ${blog.author}`,
        10,
        'success'
      )

      props.removeBlog(blog.id)
    }
  }

  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <Header>{blog.title} by {blog.author}</Header>
      <Container>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes <Button id={'like'} onClick={() => props.likeBlog(blog)}>like</Button></p>
        <p>added by {blog.user.name}</p>
        {props.currentUser !== null && props.currentUser.username === blog.user.username && <RemoveButton onClick={() => removeBlog(blog)}>remove</RemoveButton>}
      </Container>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  {
    blog: state.blogs.find(blog => blog.id === ownProps.blogId),
    currentUser: state.login,
  }
)

const mapDispatchToProps = {
  likeBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
