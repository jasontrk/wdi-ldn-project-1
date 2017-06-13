const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise     = require('bluebird');


const router = require('./config/routes');
const { port, dbURI } = require('./config/environment');


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

app.use(router);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
