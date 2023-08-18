const Videos = require('../models/Videos');

class SiteController {
   // GET /home
   async home(req, res, next) {
      try {
         const videos = await Videos.find({}).sort({ createdAt: 'asc' });

         res.json(videos);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new SiteController();
