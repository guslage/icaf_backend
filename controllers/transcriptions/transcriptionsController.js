const { Router } = require('express')
const { transcription } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
  const transcriptions = await transcription.findAll()

  res.status(200).json(transcriptions)
})

router.post('/new-transcription', async (req, res) => {
<<<<<<< HEAD
  const { wordId, description } = req.body
=======
  const { userId, wordId, description } = req.body
>>>>>>> d9e512fc283cb7095715ba2a7498fd167ac04b19

  try {
    const findtranscription = await transcription.findAll({
      where: {
<<<<<<< HEAD
        description: description,
        wordId: wordId
=======
        description,
        wordId: wordId,
        userId: userId
>>>>>>> d9e512fc283cb7095715ba2a7498fd167ac04b19
      }
    })

    if (findtranscription.length > 0) {
      return res.status(404).json({ message: 'The requested transcription already exists' })
    }

<<<<<<< HEAD
    const newTranscription = await Transcription.create({
      description: description,
      wordId: wordId
=======
    const newtranscription = await transcription.create({
      description,
      wordId: wordId,
      userId: userId,
>>>>>>> d9e512fc283cb7095715ba2a7498fd167ac04b19
    })

    return res.status(200).json({ message: 'New transcription saved successfully', data: newtranscription })
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