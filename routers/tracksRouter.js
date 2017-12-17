/*var express = require('express');
  // idGenerator = require('../utils/id-generator')();

require('../polyfills/array');

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var songs = user.songList;
    
      res.json({
        result: songs
      });
    })
    .post('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('You need to be logged in to add songs to your playlist :)');
        return;
      }

      var id = req.body.id;

      if(user.songList.find(function(dbSong) {
        return dbSong.id === id;
      })) {
        res.status(201)
          .json('This song is already in your playlist');
          return;
      }
      var song = {
        id,
        title: req.body.title,
        description: req.body.description,
        img: req.body.img
      };
      user.songList = user.songList || [];

      user.songList.push(song);

      res.status(201)
        .json('Song added to your playlist');
    })
    .put('/:id', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var id = req.params.id;
      var index = user.songList.findIndex(function(dbSong) {
        return dbSong.id === id;
      });
      if (index < 0) {
        res.status(404)
          .json('Song with such id does not exist in DB');
        return;
      }

      user.songList.splice(index, 1)

      db.save();

      res.json(
        'Song removed from your playlist'
      );
    });
  return router;
};
*/

const express = require('express'),
router = express.Router();

const db = require('../db');

router.get('/', function(req, res) {
const user = req.user;
// console.log(user)
if(!user) {
    res.status(401)
        .json('Not authorised user!');
        return;
}
const songs = user.songList;
res.json({
    result: songs
})
})
.post('/', function(req,res) {
const user = req.user;
if(!user) {
    res.status(401)
        .json('Not authorised user!')
    return;
}
const track = req.body;
const songs = user.songList;

if(songs.find(function(dbSong){
   return track.id === dbSong.id
})) {
    res.status(200)
        .json('Song already in your playlist')
    return;
}

const collection = db.get().collection('users');
collection.update({'username': user.username}, {$push:{'songList': track}})

res.status(201)
    .json('Song added to your playlist')
})
.put('/:id', function(req, res) {
const user = req.user;
if(!user) {
    res.status(401)
        .json('Not authorised user!')
}
const id = req.params.id;
const songs = user.songList;
const index = songs.find(dbSong => {
    return dbSong.id = id})
if(index < 0) {
    res.status(404)
        .json('Song with such ID does not exist in your playlist')
    return;
}

const collection = db.get().collection('users')
collection.update({'username': user.username}, {$pull:{'songList': {'id': id}}},
    () => res.status(200)
    .json('Song removed from your playlist!'))

})

module.exports = router;