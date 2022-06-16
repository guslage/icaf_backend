const { Router } = require('express')
const { Result, Word, Transcription, sequelize } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
  const transcriptions = await Result.findAll()

  res.status(200).json(transcriptions)
})

router.post('/new-results', async (req, res) => {
  const { audio, word, transcription, test, fileId } = req.body
    
  console.log(audio)
  console.log(word)
  console.log(transcription)
  console.log(test)

  console.log('fileId', fileId)

  try {
    const newResults = await Result.create({
      audio: audio,
      wordId: word,
      transcriptionId: transcription,
      testId: test,
      fileId
    })

    return res.status(200).json(newResults)
  } catch (err) {
    return res.status(500).json({ message: 'Error', data: err })
  }
})

router.get('/get-test-results', async (req, res) => {
  const { testId, wordType } = req.query

  const query = wordType === "words" 
    ? `SELECT r.audio as 'audio', w.description as 'word', t.description as 'transcription', r.fileId as 'fileId'
      FROM results as r 
      JOIN transcriptions as t ON r.transcriptionId = t.id
      JOIN words as w ON t.wordId = w.id
      WHERE r.testId = ${testId}`
    : `SELECT r.audio as 'audio', pw.description as 'word', t.description as 'transcription', r.fileId as 'fileId'
      FROM results as r 
      JOIN transcriptions as t ON r.transcriptionId = t.id
      JOIN pseudowords as pw ON t.wordId = pw.id
      WHERE r.testId = ${testId}` 

  const results = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT})

  console.log('res',results)

  return res.status(200).json(results)
})

module.exports = router