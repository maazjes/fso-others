const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const added_todos = Number((await redis.getAsync("added_todos") || 0)) + 1
  await redis.setAsync("added_todos", added_todos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  console.log(req.todo)
  if (!req.todo.text) {
    return res.sendStatus(404)
  }
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text;
  req.todo.done = req.body.done;
  const todo = await req.todo.save()
  res.send(todo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)
router.use('/:id', singleRouter)

module.exports = router;
