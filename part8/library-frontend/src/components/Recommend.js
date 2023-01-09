import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { BookTable } from './BookTable'

const Recommend = ({ show, genre }) => {
  const booksResult = useQuery(ALL_BOOKS, { variables: { genre } })
  if (!show) {
    return null
  }
  if (booksResult.loading || !genre) {
    return null
  }
  const books = booksResult.data ? booksResult.data.allBooks.filter((book) => book.genres.includes(genre)) : []
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{`${genre}`}</b>
      </p>
      <BookTable books={books} />
    </div>
  )
}

export default Recommend
