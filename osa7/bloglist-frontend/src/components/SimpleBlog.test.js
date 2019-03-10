import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders title, author and likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'test title'
  )
  expect(component.container).toHaveTextContent(
    'test author'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})

it('clicking the like-button calls event handler twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
