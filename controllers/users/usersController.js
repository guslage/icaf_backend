const { Router } = require('express')
const { User } = require('../../models')
const fs = require('fs')
const moment = require('moment')

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.findAll()

  res.status(200).json(users)
})

router.post('/find-user', async (req, res) => {
  const { username, password } = req.body

  const findUser = await User.findOne({
    where: {
      username,
      password
    }
  })

  if (findUser) {
    return res.status(200).json({ message: 'User found!', data: findUser })
  }

  return res.status(404).json({ message: 'Invalid data.' })

})

router.post('/new-user', async (req, res) => {
  const { name, school, birthDate, motherName, phone, residentialPhone, username, password } = req.body

  const newDate = moment(birthDate).format("MM-DD-YYYY")

  const findUser = await User.findAll({
    where: {
      username,
      password
    }
  })

  if (findUser.length > 0) {
    return res.status(500).json({ message: 'This user already exists!' })
  }

  await User.create({
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

  return res.status(200).json({ message: 'User registered sucessfully!' })
})

module.exports = router