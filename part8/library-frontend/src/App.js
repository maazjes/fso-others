import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ME, BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from './queries'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('booksandauthors-user-token'))
  const [currentUser, setCurrentUser] = useState({ username: '', favoriteGenre: '' })
  const { data, loading } = useQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    if (!loading && data) {
      setCurrentUser(data.me)
    }
  }, [data, loading])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  useSubscription(BOOK_ADDED, {
    onData: async ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`new book '${addedBook.title}' by ${addedBook.author.name} added`)
      await client.refetchQueries({
        include: [ALL_BOOKS, ALL_AUTHORS, ALL_GENRES]
      })
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />

      <Recommend show={page === 'recommend'} genre={currentUser.favoriteGenre} />
    </div>
  )
}

export default App
