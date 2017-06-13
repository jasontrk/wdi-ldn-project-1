const Event = require('../models/event');

function eventsIndex(req, res) {
  Event
    .find()
    .exec()
    .then((events) => {
      res.render('events/index', { events });
    })
    .catch((err) => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: eventsIndex
};
