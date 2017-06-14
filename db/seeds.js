const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

const User = require('../models/user');
User.collection.drop();

mongoose.Promise = require('bluebird');

const City = require('../models/city');
City.collection.drop();

User
.create([{
  username: 'Jason',
  email: 'jason@jason',
  password: 'password',
  passwordConfirmation: 'password'
}])

.then((users) => {
  console.log(`${users.length} users created`);

  City
  .create([
    {
      name: 'London',
      country: 'Greater London',
      lat: 51.5074,
      lng: 0.1278
    },
    {
      name: 'Bromley',
      country: 'Greater London',
      lat: 51.406025,
      lng: 0.013156
    },
    {
      name: 'Birmingham',
      country: 'Midlands',
      lat: 33.520661,
      lng: -86.802490
    },
    {
      name: 'Manchester',
      country: 'North West',
      lat: 53.480759,
      lng: -2.242631
    },
    {
      name: 'Liverpool',
      country: 'North West',
      lat: 43.106456,
      lng: -76.217705
    },
    {
      name: 'Derby',
      country: 'Midlands',
      lat: 41.320652,
      lng: -73.088997
    },
    {
      name: 'Nottingham',
      country: 'Midlands',
      lat: 52.954783,
      lng: -1.158109
    },
    {
      name: 'Leicester',
      country: 'Midlands',
      lat: 52.636878,
      lng: -1.139759
    },
    {
      name: 'Oxford',
      country: 'South East',
      lat: 51.752021,
      lng: -1.257726
    },
    {
      name: 'Luton',
      country: 'South East',
      lat: 51.878671,
      lng: -0.420026
    },
    {
      name: 'Southampton',
      country: 'South East',
      lat: 50.909700,
      lng: -1.404351
    },
    {
      name: 'Bristol',
      country: 'South West',
      lat: 36.595106,
      lng: -82.188744
    },
    {
      name: 'Norwich',
      country: 'East Anglia',
      lat: 52.630886,
      lng: 1.297355
    },
    {
      name: 'Chelmsford',
      country: 'East Anglia',
      lat: 42.599814,
      lng: -71.367284
    },
    {
      name: 'Ipswich',
      country: 'East Anglia',
      lat: 52.056736,
      lng: 1.148220
    },
    {
      name: 'Leeds',
      country: 'North East',
      lat: 53.800755,
      lng: -1.549077
    },
    {
      name: 'Huddersfield',
      country: 'North East',
      lat: 53.645792,
      lng: -1.785035
    },
    {
      name: 'Sunderland',
      country: 'North East',
      lat: 43.111394,
      lng: -73.118060
    },
    {
      name: 'Hull',
      country: 'North East',
      lat: 53.745671,
      lng: -0.336741
    },
    {
      name: 'Middlesborough',
      country: 'North East',
      lat: 54.574227,
      lng: -1.234956
    },
    {
      name: 'Sheffield',
      country: 'North East',
      lat: 53.381129,
      lng: -1.470085
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
});
