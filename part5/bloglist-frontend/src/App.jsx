/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

function BlogsByUser({ blogs, user, handleRemove, handleLike }) {
    const filtered = blogs.filter((blog) => blog.user.id === user.id || blog.user === user.id)
    return (
        <ul>
            {filtered.sort((a, b) => b.likes - a.likes).map((blog) => <Blog key={blog.id} blog={blog} handleRemove={() => handleRemove(blog)} handleLike={() => handleLike(blog)} />)}
        </ul>
    )
}

function App() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ message: null, error: null })
    const [blogs, setBlogs] = useState([])
    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const savedUser = JSON.parse(loggedUserJSON)
            setUser(savedUser)
            blogService.setToken(savedUser.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then((freshBlogs) => setBlogs(freshBlogs))
    }, [user])

    const handleLogin = async (event, username, password) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const response = await loginService.login({ username, password })
            window.localStorage.setItem('user', JSON.stringify(response))
            setUser(response)
        } catch (exception) {
            setMessage({ message: 'wrong credentials', error: true })
        }
    }

    const handleRemoveBlog = (blogToDelete) => {
        // eslint-disable-next-line no-alert
        if (window.confirm(`remove ${blogToDelete.title} by ${blogToDelete.author}?`)) {
            blogService.remove(blogToDelete.id)
            setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
        }
        setMessage({ message: `blog ${blogToDelete.title} removed`, error: false })
    }

    const handleLikeBlog = (blogToLike) => {
        const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
        const newBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
        setBlogs(blogs.map((blog) => (blog.id === blogToLike.id ? newBlog : blog)))
        blogService.update(likedBlog.id, likedBlog)
    }

    const addBlog = async (event, blog) => {
        event.preventDefault()
        blogFormRef.current()
        try {
            blog = await blogService.create(blog)
            setBlogs(blogs.concat(blog))
            setMessage({ message: `a new blog ${blog.title} by ${blog.author} added`, error: false })
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <div>
            {user === null ? (
                <div>
                    <h2>login</h2>
                    <Notification message={message} />
                    <LoginForm handleLogin={handleLogin} />
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification message={message} />
                    <div>
                        {`${user.name} logged in`}
                        <button type="submit" onClick={() => handleLogout(setUser)}>logout</button>
                    </div>
                    <br />
                    <h2>create new</h2>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm handleSubmit={addBlog} />
                    </Togglable>
                    <BlogsByUser blogs={blogs} user={user} handleRemove={handleRemoveBlog} handleLike={handleLikeBlog} />
                </div>
            )}
        </div>
    )
}

export default App
