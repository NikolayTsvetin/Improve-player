const express = require('express'),
  router = express.Router();
authKeyGenerator = require('../utils/auth-key-generator');

const db = require('../db');

router.get('/', function (req, res) {
  const collection = db.get().collection('users');
  collection.find({}).toArray(function (err, users) {
    res.json({
      result: users
    })
  })
})
  .post('/', function (req, res) {
    const user = req.body;
    user.usernameLower = user.username.toLowerCase();
    user.authKey = authKeyGenerator.get(user.id);
    user.songList = [];
    const collection = db.get().collection('users');
    collection.find({}).toArray(function (err, users) {
      if (users.find(a =>
        a.usernameLower === user.username.toLowerCase()
      )) {
        res.status(400)
          .json('Username is already taken!');
        return;
      }
      collection.insert(user);
      console.log(user);
      res.status(200)
        .json({
          result: user
        })
    })
  })
  .put('/auth', function (req, res) {
    const collection = db.get().collection('users');
    const user = req.body;
    collection.find({}).toArray(function (err, users) {
      const dbUser = users.find(a => a.usernameLower === user.username.toLowerCase())
      // console.log(dbUser);
      if (!dbUser || dbUser.passHash !== user.passHash) {
        res.status(404)
          .json('Username or password is invalid!')
        return;
      }
      res.json({
        result: {
          username: dbUser.username,
          authKey: dbUser.authKey
        }
      })
    })

  })

module.exports = router;