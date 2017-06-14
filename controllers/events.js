const Event = require('../models/event');
const rp = require('request-promise');

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



function eventProxy(req, res) {
  rp({
    url: `http://www.skiddle.com/api/v1/events/search/?api_key=${process.env.SKIDDLE_API_KEY}&latitude=${req.query.lat}&longitude=${req.query.lng}&radius=${req.query.radius}`,
    method: 'GET',
    json: true
  })
  .then((events) => {
    res.json(events);
  });
}



module.exports = {
  index: eventsIndex,
  proxy: eventProxy
};
