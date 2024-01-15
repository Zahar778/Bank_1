const express = require('express');
const router = express.Router();
const { User } = require('../class/user');

router.use(express.json());

router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    title: 'Signup page',
  });
});

router.post('/signup', function (req, res) {
  const { email, password } = req.body;

  console.log(req.body); // Добавьте эту строку для отладки

  if (!email || !password) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют',
    });
  }

  try {
    User.create({ email, password });

    return res.status(200).json({
      message: 'Пользователь успешно зарегистрирован',
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Ошибка создания пользователя',
    });
  }
});

module.exports = router;
