const express = require('express');
const router  = express.Router();

const eventsController = require('../controllers/events');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const citiesController = require('../controllers/cities');


router.get('/', (req, res) => res.render('statics/homepage'));
router.get('/news', (req, res) => res.render('statics/news'));

router.get('/event', eventsController.proxy);


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

router.route('/logout')
.get(sessionsController.delete);

router.route('/cities')
.get(citiesController.index);

router.route('/cities/:id')
.get(citiesController.show)
.put(citiesController.update);

router.route('/registrations/:id/events')
.post(eventsController.create);

router.route('/registrations/:id/events/:eventId') // id of user and event
.delete(eventsController.delete);

module.exports = router;
