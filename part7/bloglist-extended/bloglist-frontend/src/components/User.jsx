import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>user '{user.name}'</h2>
      <h4 style={{ marginTop: 30 }}>added blogs</h4>
      <Table striped>
        <thead>
          <tr>
            <th>Blog title</th>
            <th>Blog author</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
