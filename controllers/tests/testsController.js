

const { Router } = require('express')
const { Test } = require('../../models')
const moment = require('moment')
const { google } = require('googleapis')

const KEYFILEPATTH = '../../icaf-sotrage-cc16d45485e3.json'
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATTH,
  scopes: SCOPES
})

const driveService = google.drive({
  version: 'v3',
  auth
})

const router = Router()

router.get('/', async (req, res) => {
  const tests = await Test.findAll()

  res.status(200).json(tests)
})

router.get('/find-tests', async (req, res) => {
  const { type, userId } = req.query

  try {
    const test = await Test.findAll({
      where: {
        type,
        userId,
        completed: 1
      }
    }) 

    return res.status(200).json(test)
  } catch(err) {
    return res.status(500).json(err)
  }
})

router.post('/new-test', async (req, res) => {
  const { type, completedWords, userId } = req.body

  // console.log('body', req.body)

  // try {
  //   const newDate = moment()

  //   const newTest = await Test.create({
  //     type,
  //     date: newDate,
  //     completedWords,
  //     completed: 0,
  //     userId
  //   })

  //   return res.status(200).json(newTest)
  // } catch (err) {
  //   return res.status(500).json({ message: 'Error', error: err })
  // }

  
})

router.put('/update-test', async (req, res) => {
  const { id, completedWords } = req.body

  console.log(req.body)

  try {
    const newTest = await Test.update({
      completedWords
    }, {where: {
      id
    }})

    return res.status(200).json(newTest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
})

router.put('/finish-test', async (req, res) => {
  const { id } = req.body

  try {
    const finishTest = await Test.update({
      completed: 1
    }, {where: {
      id
    }})

    return res.status(200).json(finishTest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
})

router.get('/unfinished-test', async (req, res) => {
  const { id } = req.query

  try {
    const unfinishedTests = await Test.findAll({
      where: {
        userId: id,
        completed: 0
    }})

    return res.status(200).json(unfinishedTests)
  } catch (err) {
    return false
  }
})


module.exports = router