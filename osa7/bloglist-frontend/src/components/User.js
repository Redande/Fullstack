import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Header = styled.h1`
  padding: 1rem;
`

const User = props => {
  const user = props.user

  if (user === undefined) {
    return null
  }

  return (
    <div>
      <Header>{user.name}</Header>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  {
    user: state.users.find(u => u.id === ownProps.userId)
  }
)

export default connect(mapStateToProps)(User)
