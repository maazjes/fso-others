import { ALL_AUTHORS, ALL_BOOKS, SET_BIRTHYEAR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  const handleSetBirthyear = async (event) => {
    event.preventDefault()
    await setBirthYear({ variables: { name: event.target.name.value, setBornTo: parseInt(event.target.born.value) } })
    event.target.born.value = ''
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return null
  }

  const authors = result.data?.allAuthors ? result.data.allAuthors : []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={handleSetBirthyear}>
        <select name="name">
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        born
        <input name="born" />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
