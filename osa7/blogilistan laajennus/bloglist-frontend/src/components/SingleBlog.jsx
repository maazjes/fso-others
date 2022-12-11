import { Button, ListGroup } from 'react-bootstrap'

const SingleBlog = ({ blog, handleLike, handleComment }) => {
    const handleCommentSubmit = (event) => {
        event.preventDefault()
        handleComment(blog, event.target.comment.value)
        event.target.comment.value = ''
    }
    if (!blog) {
        return null
    }
    return (
        <div>
            <h2>
                blog '{blog.title}' by {blog.author}
            </h2>
            url: <a href={blog.url}>{blog.url}</a>
            <br></br>
            {`${blog.likes} likes `}
            <Button variant="primary" size="sm" className="likeButton" type="submit" onClick={() => handleLike(blog)}>
                like
            </Button>
            <br></br>
            added by '{blog.user.name}'<h3>comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <input name="comment" />
                <Button variant="primary" size="sm" className="ms-1 mb-1" type="submit">
                    add comment
                </Button>
            </form>
            <ListGroup variant="flush" as="ul">
                {blog.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default SingleBlog
