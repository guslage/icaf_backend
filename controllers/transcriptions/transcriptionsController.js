const { Router } = require('express')
const { transcription } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
  const transcriptions = await transcription.findAll()

  res.status(200).json(transcriptions)
})

router.post('/new-transcription', async (req, res) => {
  const { wordId, description } = req.body

  try {
    const findtranscription = await transcription.findAll({
      where: {
        description: description,
        wordId: wordId
      }
    })

    if (findtranscription.length > 0) {
      return res.status(404).json({ message: 'The requested transcription already exists' })
    }

    const newTranscription = await transcription.create({
      description: description,
      wordId: wordId
    })

    return res.status(200).json({ message: 'New transcription saved successfully', data: newTranscription })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.get('/find-transcriptions', async (req, res) => {
  try {
    const { wordId } = req.query

    const transcriptions = await transcription.findAll({
      where: {
        wordId
      }
    })

    return res.status(200).json(transcriptions)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

module.exports = router