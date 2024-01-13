const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
    email: 'test@mail.com',
    password: 123,
})
router.get('/signup', function (req, res) {
    return res.render ('signup', {
        name: 'signup',

        title: 'Signup page',

    })
})

router.post('/signup', function(req,res) {
    const {email, password} = req.body

    console.log(req.body)

    if(!email || !password ) {
        return res.status(400).json({
            massage: 'Помилка. Обов`язковi поля вiдсутнi'
        })
    }
    try {
        User.create({email, password})


        return res.status(200).json({
            massage: 'Користувач успiшно зарэстрованний',
        })
    }catch(err) {
        return res.status(400).json({
            massage: 'Помилка створення користувача',
        })
    }
   
})

module.exports = router