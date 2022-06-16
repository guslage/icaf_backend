const { Router } = require('express')
const { user } = require('../../models')
const fs = require('fs')
const moment = require('moment')

const router = Router()

router.get('/', async (req, res) => {
  const users = await user.findAll()

  res.status(200).json(users)
})

router.post('/find-user', async (req, res) => {
  const { username, password } = req.body

  const finduser = await user.findOne({
    where: {
      username,
      password
    }
  })

  if (finduser) {
    return res.status(200).json({ message: 'user found!', data: finduser })
  }

  return res.status(404).json({ message: 'Invalid data.' })

})

router.post('/new-user', async (req, res) => {
  const { name, school, birthDate, motherName, phone, residentialPhone, username, password } = req.body

  const newDate = moment(birthDate).format("MM-DD-YYYY")

  const finduser = await user.findAll({
    where: {
      username,
      password
    }
  })

  if (finduser.length > 0) {
    return res.status(500).json({ message: 'This user already exists!' })
  }

  await user.create({
    name,
    school,
    birthDate: newDate,
    motherName,
    phone,
    residentialPhone,
    username,
    password
  })

  const userDir = `./public/users/${username}`

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true })
  }

  return res.status(200).json({ message: 'user registered sucessfully!' })
})

module.exports = router