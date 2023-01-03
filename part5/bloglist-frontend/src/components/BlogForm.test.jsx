import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls mock twice when button is clicked twice', async () => {
    const blog = {
        author: 'asder',
        title: 'Component testing is done with react-testing-library',
        url: 'asd.com'
    }
    const mockHandler = jest.fn()
    render(<BlogForm handleSubmit={mockHandler} />)
    const user = userEvent.setup()
    const createButton = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    await userEvent.type(titleInput, blog.title)
    await userEvent.type(authorInput, blog.author)
    await userEvent.type(urlInput, blog.url)
    await user.click(createButton)
    expect(mockHandler.mock.calls[0][1]).toEqual(blog)
})
