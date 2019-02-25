import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.textField.value,
      author: author.textField.value,
      url: url.textField.value
    }
    console.log(blogObject)
    setSuccessfulMessage(`a new blog ${title.textField.value} by ${author.textField.value} added`)
    setTimeout(() => {
      setSuccessfulMessage(null)
    }, 5000)

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
      })
  }

  const incrementBlogLikes = async (blog) => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(blog.id, blogObject)

    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      setSuccessfulMessage(`removed ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000)
      await blogService.remove(blog.id)

      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const un = username.textField.value
    const pw = password.textField.value

    try {
      const user = await loginService.login({
        username: un, password: pw
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username.textField}
      password={password.textField}
      handleSubmit={handleLogin}
    />
  )

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

  return (
    <div>
      <Notification type="success" message={successfulMessage} />
      <Notification type="error" message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>

          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          {blogForm()}

          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLikeClick={incrementBlogLikes} handleRemoveClick={removeBlog} currentUser={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App
