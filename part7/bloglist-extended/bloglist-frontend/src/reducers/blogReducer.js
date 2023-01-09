import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog))
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    commentBlog(state, action) {
      state.find((blog) => blog.id === action.payload.blogId).comments.push(action.payload.comment)
    }
  }
})

export const createBlog = (content) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(content)
    dispatch(blogSlice.actions.addBlog(newBlog))
    dispatch(setNotification({ message: `new blog '${content.title}' added successfully`, error: false }, 5))
  } catch (exception) {
    dispatch(setNotification({ message: exception.message, error: true }, 5))
  }
}

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    await blogService.remove(blog.id)
    dispatch(blogSlice.actions.deleteBlog(blog.id))
    dispatch(setNotification({ message: `removed blog '${blog.title}' successfully`, error: false }, 5))
  } catch (exception) {
    dispatch(setNotification({ message: exception.message, error: true }, 5))
  }
}

export const likeBlog = (blog) => async (dispatch) => {
  try {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.update(likedBlog.id, likedBlog)
    dispatch(blogSlice.actions.likeBlog(blog.id))
  } catch (e) {
    dispatch(setNotification({ message: e.message, error: true }, 5))
  }
}

export const commentBlog = (blog, comment) => async (dispatch) => {
  try {
    if (comment === '') {
      dispatch(setNotification({ message: 'comment cannot be empty', error: true }, 5))
      return
    }
    await blogService.createComment(blog.id, { comment })
    dispatch(blogSlice.actions.commentBlog({ blogId: blog.id, comment }))
  } catch (exception) {
    dispatch(setNotification({ message: exception.message, error: true }, 5))
  }
}
export default blogSlice.reducer
export const { setBlogs, comment } = blogSlice.actions
