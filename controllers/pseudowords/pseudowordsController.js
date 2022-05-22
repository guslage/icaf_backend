const { Router } = require('express')
const { pseudoword } = require('../../models')
const { Op } = require('sequelize')

const router = Router()

router.get('/', async (req, res) => {
    const pseudowords = await pseudoword.findAll()

    console.log(pseudowords)

  return res.status(200).json(pseudowords)
})

module.exports = router