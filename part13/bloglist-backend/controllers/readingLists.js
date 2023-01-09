const router = require('express').Router();
const { ReadingList, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const found = await ReadingList.findOne({ where: { id: req.params.id } });
  if (!found) {
    return res.status(404).json({ error: 'reading list not found' });
  }
  if (!(user && found.userId === user.id)) {
    return res.status(401).json({ error: 'invalid token' });
  }
  found.read = true;
  const readingList = await found.save();
  return res.json(readingList);
});

module.exports = router;
