import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'asder',
        url: 'asd.com',
        user: {
            id: '234329239234932492439'
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleRemove={mockHandler} />)
    const element = screen.getAllByText('Component testing is done with react-testing-library', { exact: false })
    expect(element).toBeDefined()
})

test('renders url, likes and author when button is clicked', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'asder',
        url: 'asd.com',
        user: {
            id: '234329239234932492439'
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleRemove={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText('likes', { exact: false })).toBeDefined()
    expect(screen.getByText('asd.com', { exact: false })).toBeDefined()
})

test('when button is clicked twice, mock is called twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'asder',
        url: 'asd.com',
        user: {
            id: '234329239234932492439'
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleRemove={mockHandler} handleLike={mockHandler} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    const likeButton = screen.getByText('like')
    await user.click(viewButton)
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
