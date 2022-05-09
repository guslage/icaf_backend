const { Router } = require('express')
const { Transcription } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
  const transcriptions = await Transcription.findAll()

  res.status(200).json(transcriptions)
})

router.post('/new-transcription', async (req, res) => {
  const { userId, wordId, transcription } = req.body

  try {
    const findTranscription = await Transcription.findAll({
      where: {
        description: transcription,
        wordId: wordId,
        userId: userId
      }
    })

    if (findTranscription.length > 0) {
      return res.status(404).json({ message: 'The requested transcription already exists' })
    }

    const newTranscription = await Transcription.create({
      description: transcription,
      wordId: wordId,
      userId: userId,
    })

    return res.status(200).json({ message: 'New transcription saved successfully', data: newTranscription })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.get('/find-transcriptions', async (req, res) => {
  try {
    const { userId, wordId } = req.query

    const transcriptions = await Transcription.findAll({
      where: {
        userId,
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