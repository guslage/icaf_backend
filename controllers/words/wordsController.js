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

module.exports = router