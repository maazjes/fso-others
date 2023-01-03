const parseBookArgs = (args) => {
  if (!args.title || !args.author || !args.published || !args.genres) {
    throw new Error('missing arg')
  }
  if (args.title.length < 2 || args.author.length < 4 || !parseInt(args.published) || args.genres.length < 1) {
    throw new Error('invalid args')
  }
  args.genres.forEach((genre) => {
    if (genre < 2) {
      throw new Error('invalid args')
    }
  })
  return args
}

module.exports = parseBookArgs
