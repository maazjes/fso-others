import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()
  const [login] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()
    const res = await login({ variables: { username, password } })
    const token = res.data.login.value
    localStorage.setItem('booksandauthors-user-token', token)
    await setToken(token)
    await setPage('authors')
    await client.refetchQueries({
      include: [ME]
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Login = ({ show, setToken, setPage, refetch }) => {
  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginForm setPage={setPage} setToken={setToken} refetch={refetch} />
    </div>
  )
}

export default Login
