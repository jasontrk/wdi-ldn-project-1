const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-ldn-project-1';
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';


module.exports = { port, dbURI, sessionSecret };
