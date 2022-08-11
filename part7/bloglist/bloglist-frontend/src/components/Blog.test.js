import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  describe('test displaying content', () => {
    beforeEach(() => {
      const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Matti Lukkainen',
        url: 'www.fullstackopen.com',
        likes: '0',
        user: '62d91318f759a24adb3535f2',
      }

      container = render(<Blog blog={blog} />).container
    })

    test('renders title and author, but not url or likes by default', () => {
      const title = screen.getByText(
        'Component testing is done with react-testing-library Matti Lukkainen'
      )
      expect(title).toBeDefined

      const div = container.querySelector('.togglableContent')
      expect(div).toHaveStyle('display: none')
    })

    test('renders url and likes when button toggling details is clicked', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const div = container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Matti Lukkainen',
      url: 'www.fullstackopen.com',
      likes: '0',
      user: '62d91318f759a24adb3535f2',
    }

    const mockHandler = jest.fn()

    container = render(<Blog blog={blog} updateBlog={mockHandler} />).container
    const user = userEvent.setup()
    const button = container.querySelector('.likeButton')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
