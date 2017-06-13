const express = require('express');
const router  = express.Router();




const eventsController = require('../controllers/events');

router.get('/', (req, res) => res.redirect('/events'));

router.route('/events')
  .get(eventsController.index);

module.exports = router;
