import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          className="titleInput"
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
          className="authorInput"
        />
        <Form.Label>url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          className="urlInput"
        />
        <Button variant="primary" id="createButton" type="submit">
        create
        </Button>
        <Button variant="secondary" onClick={clearForm}>
        clear
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
