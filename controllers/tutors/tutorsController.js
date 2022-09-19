const { Router } = require('express')
const { tutor } = require('../../models')

const router = Router()

router.get('/', async (req, res) => {
  const tutors = await tutor.findAll()

  res.status(200).json(tutors)
})

router.post('/find-tutor', async (req, res) => {
  const { username, password } = req.body
  
  const findTutor = await tutor.findOne({
    where: {
      username, 
      password
    }
  })

  if (findTutor) {
    return res.status(200).json({ message: 'user found!', data: findTutor })
  }

  return res.status(404).json({ message: 'Invalid data.' })
})

router.post('/new-tutor', async (req, res) => {
  try {
    const { name, email, username, password } = req.body

    const findTutor = await tutor.findAll({
      where: {
        username,
        email
      }
    })

    if (findTutor.length > 0) {
      return res.status(500).json({ message: 'This user already exists!' })
    }

    await tutor.create({
      name,
      email,
      username,
      password
    })

    return res.status(200).json({ message: 'user registered sucessfully!' })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router