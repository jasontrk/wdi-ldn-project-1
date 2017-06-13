const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

const User = require('../models/user');
User.collection.drop();

mongoose.connection.close();
