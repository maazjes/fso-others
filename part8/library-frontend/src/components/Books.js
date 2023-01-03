import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'
import { BookTable } from './BookTable'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const booksResult = useQuery(ALL_BOOKS, genre === 'all' ? undefined : { variables: { genre } })
  const genresResult = useQuery(ALL_GENRES)
  if (!props.show) {
    return null
  }
  if (booksResult.loading || genresResult.loading) {
    return null
  }
  const books = booksResult.data.allBooks
  const genres = genresResult.data.allGenres
  return (
    <div>
      <h2>books</h2>
      {genre === 'all' ? null : (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <BookTable books={books} />
      {genres.map((genre) => (
        <button key={genre.name} onClick={() => setGenre(genre.name)}>
          {genre.name}
        </button>
      ))}
      <button onClick={() => setGenre('all')}>all</button>
    </div>
  )
}

export default Books
