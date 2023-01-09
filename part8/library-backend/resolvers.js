const { ApolloError, AuthenticationError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const Genre = require('./models/genre')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const parseBookArgs = require('./util/helpers')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      const filteredBooks = books.filter((book) =>
        args.author && args.genre
          ? book.author.name === args.author && book.genres.includes(args.genre)
          : args.author
          ? book.author.name === args.author
          : args.genre
          ? book.genres.includes(args.genre)
          : book
      )
      console.log(filteredBooks)
      return filteredBooks
    },
    allGenres: async () => await Genre.find({}),
    me: (root, args, context) => {
      return context.currentUser ? context.currentUser : { username: '', favoriteGenre: '' }
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const request = await Author.findOne({ _id: root.id })
      return request.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      args = parseBookArgs(args)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      }
      if (!author.books) {
        author.books = []
      }
      const book = new Book({ ...args, author })
      await book.save().catch((error) => {
        throw new ApolloError('invalid args')
      })
      author.books = author.books.concat(book)
      await author.save().catch((error) => {
        throw new ApolloError('invalid args')
      })
      args.genres.forEach(async (genre) => {
        await new Genre({ name: genre }).save().catch((error) => {
          console.log('duplicate genre removed')
        })
      })
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      return await author.save().catch((error) => {
        throw new ApolloError('invalid args')
      })
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorToEdit = await Author.findOne({ name: args.name })
      if (!authorToEdit) {
        return null
      }
      authorToEdit.born = args.setBornTo
      return await authorToEdit.save().catch((error) => {
        throw new ApolloError('invalid args')
      })
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return await user.save().catch((error) => {
        throw new ApolloError('invalid args')
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new ApolloError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user.id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addGenre: async (root, args) => {
      return await new Genre({ name: args.name }).save().catch((error) => {
        throw new ApolloError('invalid args')
      })
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
