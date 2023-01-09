const router = require('express').Router();
const { ActiveSession, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findOne({
    where: { username: req.decodedToken.username },
    attributes: ['id']
  });
  const token = await ActiveSession.destroy({ where: { userId: user.id } });
  return res.json(token);
});

module.exports = router;
