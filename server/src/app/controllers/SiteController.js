const Videos = require('../models/Videos');

class SiteController {
   // GET /home
   async home(req, res, next) {
      try {
         // console.log(req.query);
         const startIndex = req.query.startIndex;
         const perPage = req.query.perPage;

         const videos = await Videos.find({})
            .sort({ createdAt: 'asc' })
            .skip(startIndex)
            .limit(perPage);

         res.json(videos);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new SiteController();
