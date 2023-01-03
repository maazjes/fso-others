const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined
console.log(MONGO_URL)
console.log(REDIS_URL)
module.exports = {
  MONGO_URL,
  REDIS_URL
}