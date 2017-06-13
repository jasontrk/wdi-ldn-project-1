const express = require('express');
const router  = express.Router();

const eventsController = require('../controllers/events');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');

router.get('/', (req, res) => res.render('statics/homepage'));

router.route('/events')
  .get(eventsController.index);

router.route('/registrations/:id')
  .get(registrationsController.show)
  .post(registrationsController.update)
  .delete(registrationsController.delete);

router.route('/registrations/:id/edit')
  .get(registrationsController.edit);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

module.exports = router;
