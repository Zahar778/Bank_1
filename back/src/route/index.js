// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const auth = require('./auth')
const { User } = require('../class/user')
// Підключіть інші файли роутів, якщо є 
const post = require('./post')
// Об'єднайте файли роутів за потреби 
 
 
router.use('/', auth)
router.use('/', post)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json(User)
})

// Експортуємо глобальний роутер
module.exports = router
