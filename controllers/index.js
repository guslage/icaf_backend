const transcriptionController = require('./transcriptions/transcriptionsController')
const userController = require('./users/usersController')
const wordController = require('./words/wordsController')
const testController = require('./tests/testsController')
const resultController = require('./results/resultsControllers')
const pseudowordController = require('./pseudowords/pseudowordsController')
const tutorController = require('./tutors/tutorsController')

module.exports = {
  transcriptions: transcriptionController,
  users: userController,
  words: wordController,
  tests: testController,
  results: resultController,
  pseudoWords: pseudowordController,
  tutors: tutorController
}

