import { useState } from 'react'

function Blog({ blog, handleRemove, handleLike }) {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div className="blog" style={blogStyle}>
            <div style={hideWhenVisible}>
                {`${blog.title} ${blog.author}`}
                <button className="viewButton" type="submit" onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible}>
                {`${blog.title} ${blog.author}`}
                <button type="submit" onClick={toggleVisibility}>hide</button>
                <div>
                    {blog.url}
                    <br />
                    {`${blog.likes} likes`}
                    <button className="likeButton" type="submit" onClick={handleLike}> like </button>
                </div>
                <button type="submit" onClick={handleRemove}>remove</button>
            </div>
        </div>
    )
}
export default Blog
