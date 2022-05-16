

const { Router } = require('express')
const { Test } = require('../../models')
const moment = require('moment')

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

  console.log('body', req.body)

  try {
    const newDate = moment()

    const newTest = await Test.create({
      type,
      date: newDate,
      completedWords,
      completed: 0,
      userId
    })

    return res.status(200).json(newTest)
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err })
  }
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

router.get('/get-audio', function (req, res) {
  var musicPath = "http://127.0.0.1:3333/public/users/guslage/naming/test_31/tapete.mp3"; //change this path to your music file.
  var onclickHTML = "var audio = new Audio('" + sound + "'); audio.play();"


  res.send('<button onclick="' + onclickHTML + '">click me to hear music</button>'); //this creates a button that the user can click to play some audio.
})

// router.get('/get-test', async (req, res) => {
//   const { type, date, userId } = req.query

//   try {
//     const test = await Test.findOne({
//       where: {
//         type,
//         date,
//         userId,
//         completed: 1
//       }
//     }) 

//     return res.status(200).json(test)
//   } catch(err) {
//     return res.status(500).json(err)
//   }
// })

module.exports = router