import { useState } from 'react'
import PropTypes from 'prop-types'

function BlogForm({ handleSubmit }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <form onSubmit={(event) => {
            handleSubmit(event, { title, author, url })
            setTitle('')
            setAuthor('')
            setUrl('')
        }}
        >
            title:
            <input id="title" value={title} placeholder="title" onChange={({ target }) => setTitle(target.value)} />
            <br />
            author:
            <input id="author" value={author} placeholder="author" onChange={({ target }) => setAuthor(target.value)} />
            <br />
            url:
            <input id="url" value={url} placeholder="url" onChange={({ target }) => setUrl(target.value)} />
            <br />
            <button id="createButton" type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default BlogForm
