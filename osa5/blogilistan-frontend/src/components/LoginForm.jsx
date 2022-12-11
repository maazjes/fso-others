import { useState } from 'react'
import PropTypes from 'prop-types'

function LoginForm({ handleLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form id="loginForm" onSubmit={(event) => handleLogin(event, username, password)}>
            <div>
                username
                <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id="loginButton" type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm
