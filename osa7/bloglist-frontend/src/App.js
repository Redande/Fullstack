import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Menu from './components/Navigation'
import Notification from './components/Notification'
import { useField } from './hooks'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { logIn, restoreUser } from './reducers/loginReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import styled from 'styled-components'

const Header = styled.h1`
  padding: 1rem;
`

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.restoreUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const un = username.textField.value
    const pw = password.textField.value

    try {
      const user = await props.logIn(un, pw)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification(
        'wrong username or password',
        10,
        'error'
      )
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username.textField}
      password={password.textField}
      handleSubmit={handleLogin}
    />
  )

  return (
    <Router>
      <div>
        <div>
          <Notification />

          {props.user === null ?
            loginForm() :
            <div>
              <Menu />
              <Header>blog app</Header>
            </div>
          }
        </div>

        <Route exact path="/" render={() =>
          <Blogs />
        } />
        <Route exact path="/users" render={() =>
          <Users />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <User userId={match.params.id} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blogId={match.params.id} />
        } />
      </div>
    </Router>
  )
}

const mapStateToProps = state => (
  {
    user: state.login,
    users: state.users,
  }
)

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setNotification,
  logIn,
  restoreUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
