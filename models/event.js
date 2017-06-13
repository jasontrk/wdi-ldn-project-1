// schema:
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String },
  venue: { type: String},
  location: { type: String},
  description: { type: String},
  category: { type: String}
   
});


module.exports = mongoose.model('Event', eventSchema);
