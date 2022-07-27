import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const [blogVisible, setBlogVisible] = useState(false)

    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    const toggleBlogVisibility = () => {
        setBlogVisible(!blogVisible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const updateLikes = (event) => {
        event.preventDefault()
        updateBlog(blog.id, {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        })
    }

    const deleteSelf = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }

    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleBlogVisibility} style={hideWhenVisible}>view</button>
            <button onClick={toggleBlogVisibility} style={showWhenVisible}>hide</button>
            <div style={showWhenVisible} className='togglableContent'>
                <div className='url'>{blog.url}</div>
                <div className='likes'>likes {blog.likes} <button onClick={updateLikes}>like</button></div>
                <div>{blog.user.name}</div>
            </div>
            <button onClick={deleteSelf}>delete</button>
        </div>
    )
}

export default Blog