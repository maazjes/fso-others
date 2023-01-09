const router = require('express').Router();
const { Op, where } = require('sequelize');
const { Blog, User, ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: '%' + req.query.search + '%' } },
      { author: { [Op.iLike]: '%' + req.query.search + '%' } },
      { url: { [Op.iLike]: '%' + req.query.search + '%' } }
    ];
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  });
  return res.json(blogs);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  });
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' });
  }
  return res.json(blog);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user) {
    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  }
  return res.status(401).json({ error: 'invalid token' });
});

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const found = await Blog.findByPk(req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'blog not found' });
  }
  if (!(user && found.userId === user.id)) {
    return res.status(401).json({ error: 'invalid token' });
  }
  await ReadingList.destroy({
    where: { [Op.and]: [{ blogId: req.params.id }, { userId: user.id }] }
  });
  const blog = await Blog.destroy({
    where: { id: req.params.id }
  });
  return res.json(blog);
});

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' });
  }
  blog.likes = req.body.likes;
  const savedBlog = await blog.save();
  return res.json(savedBlog);
});

module.exports = router;
