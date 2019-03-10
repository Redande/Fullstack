import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.h1`
  padding: 1rem;
`

const Users = props => (
  <div>
    <Header>Users</Header>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`} id={'name'}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

const mapStateToProps = state => (
  {
    users: state.users,
  }
)

export default connect(mapStateToProps)(Users)
