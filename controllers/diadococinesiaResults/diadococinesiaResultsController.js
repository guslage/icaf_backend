const { Router } = require('express')
const { diadococinesiaResult } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
    const results = await diadococinesiaResult.findAll()

  return res.status(200).json(results)
})

router.get('/find-results', async(req, res) => {
  const { testId } = req.query

  const results = await diadococinesiaResult.findAll({
    where: {
      testId
    }
  })

  return res.status(200).json(results)
})

router.get('/new-results', async(req, res) => {
  const { fileId, transcriptions, testId } = req.query

  console.log('body', req.query)

  try {
    const results = await diadococinesiaResult.create({
      fileId,
      transcriptions, 
      testId
    })
  
    return res.status(200).json(results)
  } catch(err) {
    console.log('err--------------', err)
  }
})

module.exports = router