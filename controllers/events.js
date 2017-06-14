const User = require('../models/user');
const rp = require('request-promise');

function eventProxy(req, res) {
  rp({
    url: `http://www.skiddle.com/api/v1/events/search/?api_key=${process.env.SKIDDLE_API_KEY}&latitude=${req.query.lat}&longitude=${req.query.lng}&radius=${req.query.radius}&eventcode=LIVE&order=trending`,
    method: 'GET',
    json: true
  })
  .then((events) => {
    res.json(events);
  });
}

function createEventRoute(req, res, next) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    console.log(user);
    if(!user) return res.notFound();
    user.events.push(req.body); //pushes the data from the req body (which user evented) onto the event, as its an array.
    return user.save();
  })
  .then((user) => res.redirect(`/registrations/${user.id}`))
  .catch(next);
}

function deleteEventRoute(req, res, next) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    if(!user) return res.notFound();
    //get the embedded record by its id
    const event = user.events.id(req.params.eventId);
    event.remove();

    return user.save();
  })
  .then((user) => res.redirect(`/registrations/${user.id}`))
  .catch(next);
}


module.exports = {

  proxy: eventProxy,
  create: createEventRoute,
  delete: deleteEventRoute
};
