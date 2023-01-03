import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

function BlogForm({ handleSubmit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <Form
      onSubmit={(event) => {
        handleSubmit(event, { title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
      }}
    >
      <Form.Group>
        <Form.Label>title: </Form.Label>
        <Form.Control id="title" value={title} placeholder="title" onChange={({ target }) => setTitle(target.value)} />
        <br />
        <Form.Label>author: </Form.Label>
        <Form.Control id="author" value={author} placeholder="author" onChange={({ target }) => setAuthor(target.value)} />
        <br />
        <Form.Label>url: </Form.Label>
        <Form.Control id="url" value={url} placeholder="url" onChange={({ target }) => setUrl(target.value)} />
        <br />
        <Button variant="primary" id="createButton" type="submit">
          create
        </Button>
      </Form.Group>
    </Form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm
