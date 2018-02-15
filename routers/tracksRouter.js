const express = require('express'),
  router = express.Router();

const db = require('../db');

router.get('/', function (req, res) {
  const user = req.user;
  // console.log(user)
  if (!user) {
    res.status(401)
      .json('Not authorised user!');
    return;
  }
  const songs = user.songList;
  res.json({
    result: songs
  })
})
  .post('/', function (req, res) {
    const user = req.user;
    if (!user) {
      res.status(401)
        .json('Not authorised user!')
      return;
    }
    const track = req.body;
    const songs = user.songList;

    if (songs.find(function (dbSong) {
      return track.id === dbSong.id
    })) {
      res.status(200)
        .json('Song already in your playlist')
      return;
    }

    const collection = db.get().collection('users');
    collection.update({ 'username': user.username }, { $push: { 'songList': track } })

    res.status(201)
      .json('Song added to your playlist')
  })
  .put('/:id', function (req, res) {
    const user = req.user;
    if (!user) {
      res.status(401)
        .json('Not authorised user!')
    }
    const id = req.params.id;
    const songs = user.songList;
    const index = songs.find(dbSong => {
      return dbSong.id = id
    })
    if (index < 0) {
      res.status(404)
        .json('Song with such ID does not exist in your playlist')
      return;
    }

    const collection = db.get().collection('users')
    collection.update({ 'username': user.username }, { $pull: { 'songList': { 'id': id } } },
      () => res.status(200)
        .json('Song removed from your playlist!'))

  })

module.exports = router;