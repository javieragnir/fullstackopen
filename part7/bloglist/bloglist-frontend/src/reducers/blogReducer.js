import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      const id = action.payload.id
      return state.map(blog =>
        blog.id === id ? changedBlog : blog
      ).sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(
        blog => blog.id !== id
      )
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(
      blogs.sort((a, b) => (b.likes - a.likes))
    ))
  }
}

export const createBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const id = blog.id
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const newBlog = await blogService.update(id, changedBlog)
    dispatch(updateBlog(newBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    const id = blog.id
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    const id = blog.id
    const changedBlog = {
      ...blog,
      comments: blog.comments ? [...blog.comments, comment] : [comment],
      user: blog.user.id
    }
    const newBlog = await blogService.addComment(id, changedBlog)
    dispatch(updateBlog(newBlog))
  }
}

export default blogSlice.reducer