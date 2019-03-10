import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10,
    url: 'test.com',
    id: 'test123'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeClick={mockHandler} handleRemoveClick={mockHandler} currentUser={null} />
  )

  expect(component.container).toHaveTextContent(
    'test title'
  )
  expect(component.container).toHaveTextContent(
    'test author'
  )
  expect(component.container).not.toHaveTextContent(
    '10 likes'
  )
  expect(component.container).not.toHaveTextContent(
    'test.com'
  )
  expect(component.container).not.toHaveTextContent(
    'added by test author'
  )
})

it('clicking the blog shows more info', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10,
    url: 'test.com',
    id: 'test123'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeClick={mockHandler} handleRemoveClick={mockHandler} currentUser={null} />
  )

  const blogContainer = component.getByText('blogContainer')
  fireEvent.click(blogContainer)

  expect(component.container).toHaveTextContent(
    '10 likes'
  )
  expect(component.container).toHaveTextContent(
    'test.com'
  )
  expect(component.container).toHaveTextContent(
    'added by test author'
  )
})
