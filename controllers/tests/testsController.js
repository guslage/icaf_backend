

const { Router } = require('express')
const { test } = require('../../models')
const moment = require('moment')

const router = Router()

router.get('/', async (req, res) => {
  const tests = await test.findAll()

  res.status(200).json(tests)
})

router.get('/find-tests', async (req, res) => {
  const { type, userId } = req.query

  try {
    const response = await test.findAll({
      where: {
        type,
        userId,
        completed: 1
      }
    }) 

    return res.status(200).json(response)
  } catch(err) {
    return res.status(404).json({message: err, test: 'alo'})
  }
})

router.post('/new-test', async (req, res) => {
  const { type, completedWords, userId } = req.body

  console.log('body', req.body)

  try {
    const newDate = moment()

    const newtest = await test.create({
      type,
      date: newDate,
      completedWords,
      completed: 0,
      userId
    })

    return res.status(200).json(newtest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
})

router.put('/update-test', async (req, res) => {
  const { id, completedWords } = req.body

  console.log(req.body)

  try {
    const newtest = await test.update({
      completedWords
    }, {where: {
      id
    }})

    return res.status(200).json(newtest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
})

router.put('/finish-test', async (req, res) => {
  const { id } = req.body

  try {
    const finishtest = await test.update({
      completed: 1
    }, {where: {
      id
    }})

    return res.status(200).json(finishtest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
})

router.get('/unfinished-test', async (req, res) => {
  const { id } = req.query

  try {
    const unfinishedtests = await test.findAll({
      where: {
        userId: id,
        completed: 0
    }})

    return res.status(200).json(unfinishedtests)
  } catch (err) {
    return false
  }
})


module.exports = router