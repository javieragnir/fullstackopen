import { useState } from 'react'

const Blog = ({blog}) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : ''}
  const showWhenVisible = { display: blogVisible ? '' : 'none'}

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

  return ( 
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleBlogVisibility} style={hideWhenVisible}>view</button>
      <button onClick={toggleBlogVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        {blog.user ?
          <div>{blog.user.name}</div> : null}
      </div>
    </div>  
  )
}

export default Blog