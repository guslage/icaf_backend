const { Router } = require('express')
const { word } = require('../../models')
const { Op } = require('sequelize')

const router = Router()

router.get('/', async (req, res) => {
    const words = await word.findAll()

  return res.status(200).json(words)
})

router.get('/find-words', async (req, res) => {
  const { previousWords } = req.query

  //console.log(previousWords)

  let notIn = []

  const keys = Object.keys(previousWords)

  keys.forEach((key, index) => {
    notIn.push(previousWords[key])
  })

  const words = await word.findAll({
    where: {
      id: {
        [Op.notIn]: notIn
      }
    }
  })

  return res.status(200).json(words)
})

router.post('/new-word', async (req, res) => {
  const { wordId, newWord } = req.body

  const findWord = await word.findAll({
    where: {
      description: newWord
    }
  })

  if (findWord.length > 0) {
    return res.status(404).json({ message: 'The requested word already exists' })
  }

  await word.create({
    id: wordId,
    description: newWord
  })

  return res.status(200).json({ message: 'Word saved successfully' })
})

module.exports = router