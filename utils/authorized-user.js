const AUTH_KEY_HEADER_NAME = 'x-auth-key';

module.exports = function (app, db) {
  app.use(function (req, res, next) {
    const authKey = req.headers[AUTH_KEY_HEADER_NAME];
    const collection = db.get().collection('users');
    collection.find({}).toArray(function (err, users) {
      req.user = users.find(a => a.authKey === authKey) || null;
      // console.log(req.user);
      next()
    })

  })
}