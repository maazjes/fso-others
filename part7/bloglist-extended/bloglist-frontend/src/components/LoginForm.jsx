import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form id="loginForm" onSubmit={(event) => handleLogin(event, username, password)}>
      <div>
        <Form.Label>username</Form.Label>
        <Form.Control id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <Form.Label>password</Form.Label>
        <Form.Control id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <Button className="mt-2" variant="primary" id="loginButton" type="submit">
        login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
