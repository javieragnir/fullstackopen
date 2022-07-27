import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls props event handler with right details when new blog created', async () => {
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const sendButton = screen.getByText('create')

    await userEvent.type(titleInput, 'testing a form')
    await userEvent.type(authorInput, 'John Doe')
    await userEvent.type(urlInput, 'https://www.random.com')
    await userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
    expect(createBlog.mock.calls[0][0].author).toBe('John Doe')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.random.com')
})