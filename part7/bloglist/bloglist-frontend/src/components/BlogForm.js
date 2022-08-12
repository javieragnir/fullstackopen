import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const resetFields = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }))
    resetFields()
  }

  const clearForm = (event) => {
    event.preventDefault()
    resetFields()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          className="titleInput"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
          className="authorInput"
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          className="urlInput"
        />
      </div>
      <button id="createButton" type="submit">
        create
      </button>
      <button onClick={clearForm}>
        clear
      </button>
    </form>
  )
}

export default BlogForm
