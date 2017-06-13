const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise     = require('bluebird');
const morgan = require('morgan');
const session = require('express-session');
const router = require('./config/routes');
const { port, dbURI, sessionSecret } = require('./config/environment');
const flash = require('express-flash');
const authentication = require('./lib/authentication');
const customResponses= require('./lib/customResponses');
const methodOverride = require('method-override');

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// set up flash messages AFTER sessions
app.use(flash());

app.use(authentication);
app.use(customResponses);

app.use(router);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
