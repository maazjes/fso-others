/* eslint-disable no-shadow */
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Table, Button, Navbar, Nav } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { createBlog, setBlogs, likeBlog, deleteBlog, commentBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import { setUsers } from './reducers/usersReducer'

function BlogsByUser({ blogs, user }) {
  const filtered = blogs.filter((blog) => blog.user.id === user.id || blog.user === user.id)
  return (
    <Table striped>
      <thead>
        <tr>
          <th>blog title</th>
          <th>blog author</th>
        </tr>
      </thead>
      <tbody>
        {filtered
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar className="mb-4" collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link style={padding} href="/">
            blogs
          </Nav.Link>
          <Nav.Link style={padding} href="/users">
            users
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

function App() {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogMatch = useMatch('/blogs/:id')
  const userMatch = useMatch('/users/:id')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(savedUser))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((freshBlogs) => dispatch(setBlogs(freshBlogs)))
    axios.get('http://localhost:3001/api/users').then((response) => dispatch(setUsers(response.data)))
  }, [])

  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    // eslint-disable-next-line no-console
    console.log('logging in with', username, password)
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password })
      window.localStorage.setItem('user', JSON.stringify(response.data))
      dispatch(setUser(response.data))
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong credentials', error: true }, 5))
    }
  }

  const handleRemoveBlog = (blogToDelete) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`remove '${blogToDelete.title}' by ${blogToDelete.author}?`)) {
      dispatch(deleteBlog(blogToDelete))
      navigate('/')
    }
  }

  const handleLikeBlog = (blogToLike) => {
    dispatch(likeBlog(blogToLike))
  }

  const handleCommentBlog = (blog, comment) => {
    dispatch(commentBlog(blog, comment))
  }

  const addBlog = (event, blog) => {
    event.preventDefault()
    blogFormRef.current()
    dispatch(createBlog(blog))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
    navigate('/')
  }

  const home = () => (
    <div>
      {!user ? (
        <div>
          <h2>login</h2>
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h3>create new</h3>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleSubmit={addBlog} />
          </Togglable>
          <BlogsByUser blogs={blogs} user={user} handleRemove={handleRemoveBlog} handleLike={handleLikeBlog} />
        </div>
      )}
    </div>
  )

  return (
    <div className="container">
      <Notification />
      {user ? (
        <div>
          <Menu />
          <div style={{ marginBottom: 5 }}>
            {`${user.name} logged in`}
            <Button className="ms-2" variant="dark" size="sm" type="submit" onClick={() => handleLogout(setUser)}>
              logout
            </Button>
          </div>
          <h2 style={{ marginBottom: 30 }}>blog app</h2>
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      <Routes>
        <Route path="/" element={home()} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userMatch ? users.find((user) => user.id === userMatch.params.id) : null} />} />
        <Route
          path="/blogs/:id"
          element={
            <SingleBlog
              blog={blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null}
              handleLike={handleLikeBlog}
              handleComment={handleCommentBlog}
              handleRemove={handleRemoveBlog}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
