const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const Genre = require('./models/genre')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const createAuthor = (args) => {
  return args.born ? { ...args } : { ...args, born: null }
}

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books.filter((book) =>
        args.author && args.genre
          ? book.author.name === args.author && book.genres.includes(args.genre)
          : args.author
          ? book.author.name === args.author
          : args.genre
          ? book.genres.includes(args.genre)
          : book
      )
    },
    allGenres: async () => await Genre.find({}),
    me: (root, args, context) => {
      console.log(context)
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
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      args.genres.forEach(async (genre) => {
        await new Genre({ name: genre }).save().catch((error) => {
          console.log(error.message)
        })
      })
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author(createAuthor({ name: args.author }))
      }
      const book = new Book({ ...args, author })
      await book.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
      if (!author.books) {
        author.books = []
      }
      author.books = author.books.concat(book)
      await author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author(createAuthor(args))
      return await author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
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
      return await authorToEdit.save()
    },
    createUser: async (root, args) => {
      console.log(args)
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user.id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addGenre: async (root, args) => {
      return await new Genre({ name: args.name }).save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
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
