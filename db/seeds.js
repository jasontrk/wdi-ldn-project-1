const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

const User = require('../models/user');
User.collection.drop();

mongoose.Promise = require('bluebird');

const City = require('../models/city');

City.collection.drop();

City
  .create([
    {
      name: 'London',
      country: 'Greater London',
      lat: 51.5074,
      lng: 0.1278
    },
    {
      name: 'Paris',
      country: 'France',
      lat: 48.8566,
      lng: 2.3522
    },
    {
      name: 'Rome',
      country: 'Italy',
      lat: 41.9028,
      lng: 12.4964
    },
    {
      name: 'Berlin',
      country: 'Germany',
      lat: 52.5200,
      lng: 13.4050
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      lat: 25.2048,
      lng: 55.2708
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      lat: 35.6895,
      lng: 139.6917
    },
    {
      name: 'Sydney',
      country: 'Australia',
      lat: 33.8688,
      lng: 151.2093
    },
    {
      name: 'New York City',
      country: 'United States of America',
      lat: 40.7128,
      lng: 74.0059
    },
    {
      name: 'Mumbai',
      country: 'India',
      lat: 19.0760,
      lng: 72.8777
    },
    {
      name: 'Beijing',
      country: 'China',
      lat: 39.9042,
      lng: 116.4074
    }
  ])
  .then((cities) => {
    console.log(`${cities.length} cities created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
mongoose.connection.close();
