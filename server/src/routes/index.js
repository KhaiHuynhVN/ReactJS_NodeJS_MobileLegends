const siteRoute = require('./site');
const videoRoute = require('./video');
const meRoute = require('./me');

function route(app) {
   app.use('/videos', videoRoute);
   app.use('/me', meRoute);
   app.use('/', siteRoute);
}

module.exports = route;
