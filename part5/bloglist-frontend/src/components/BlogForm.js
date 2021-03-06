import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
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
                    className='titleInput'
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
                    className='authorInput'
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
                    className='urlInput'
                />
            </div>
            <button id="createButton" type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm