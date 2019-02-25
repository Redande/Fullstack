import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    setSuccessfulMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    setTimeout(() => {
      setSuccessfulMessage(null)
    }, 5000)

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm
        title={newTitle}
        author={newAuthor}
        url={newUrl}
        onTitleChange={handleTitleChange}
        onAuthorChange={handleAuthorChange}
        onUrlChange={handleUrlChange}
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
