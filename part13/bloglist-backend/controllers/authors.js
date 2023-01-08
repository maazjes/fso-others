const router = require('express').Router();
const { Op, where, col, fn } = require('sequelize');
const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('author')), 'blogs'],
      [fn('SUM', col('likes')), 'likes']
    ],
    group: [['blog.author']]
  });
  res.json(authors);
});

module.exports = router;
