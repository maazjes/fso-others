export const updateCache = (cache, booksQuery, genresQuery, authorsQuery, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(booksQuery, ({allBooks}) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
  cache.updateQuery(genresQuery, ({ allGenres }) => {
    return {
      allGenres: uniqByName(allGenres.concat(addedBook.genres))
    }
  })
  cache.updateQuery(authorsQuery, ({ allAuthors }) => {
    return {
      allAuthors: uniqByName(allAuthors.concat(addedBook.author))
    }
  })
}
