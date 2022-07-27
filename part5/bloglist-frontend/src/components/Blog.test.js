import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Matti Lukkainen',
        url: 'www.fullstackopen.com',
        likes: '0',
        user: '62d91318f759a24adb3535f2'
    }

    const { container } = render(<Blog blog={blog} />)

    screen.debug()

    const title = screen.getByText('Component testing is done with react-testing-library Matti Lukkainen')
    expect(title).toBeDefined

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
})