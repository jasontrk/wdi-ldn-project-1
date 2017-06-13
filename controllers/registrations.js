const User = require('../models/user');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {

  User
  .create(req.body)
  .then(() => res.redirect('/login'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
    next(err);
  });
}

function showRoute(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    if (!user) return res.status(404).render('error', { error: 'No user found.'});
    res.render('registrations/show', { user });
  })
  .catch((err) => {
    res.status(500).render('error', { error: err });
  });
}

function editRoute(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then(user => {
    if (!user) return res.status(404).render('error', { error: 'No user found.'});
    res.render('registrations/edit', { user });
  })
  .catch(err => {
    res.status(500).render('error', { error: err });
  });
}

function updateRoute(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    req.body.password = user.password;

    if (!user) return res.status(404).render('statics/error', { error: 'No user found.'});

    for(const field in req.body) {
      user[field] = req.body[field];
    }
    return user.save();
  })
  .then((user) => {
    res.redirect(`/registrations/${user.id}`);
  })
  .catch((err) => {
    res.status(500).render('statics/error', { error: err });
  });
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/register', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
