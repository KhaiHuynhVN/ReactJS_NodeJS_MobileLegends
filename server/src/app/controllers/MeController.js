const Videos = require('../models/Videos');

class MeController {
   // GET /me/stored/videos
   async storedVideos(req, res, next) {
      try {
         let currPage = Number(req.query.currPage);
         const perPage = Number(req.query.perPage);
         const searchValue = req.query.searchValue;

         const videoCounter = await Videos.countDocuments({
            name: { $regex: searchValue, $options: 'i' },
         });

         // *, (, ), +, ?, [, \,

         const totalPages = Math.ceil(videoCounter / perPage);

         if (!currPage || currPage < 1) {
            currPage = 1;
         } else if (currPage > totalPages && totalPages > 0) {
            currPage = totalPages;
         }

         const skip = (currPage - 1) * perPage;

         const videoCounterAll = await Videos.countDocuments({});

         const videos = await Videos.find({ name: { $regex: searchValue, $options: 'i' } })
            .skip(skip)
            .limit(perPage);

         const deletedVideoCounter = await Videos.countDocumentsWithDeleted({
            deleted: true,
            permanentlyDestroy: null,
         });

         res.json({ videos, videoCounter, deletedVideoCounter, videoCounterAll });
      } catch (error) {
         next(error);
      }
   }

   // GET /me/trash/videos
   async trashVideos(req, res, next) {
      try {
         let currPage = Number(req.query.currPage);
         const perPage = Number(req.query.perPage);
         const searchValue = req.query.searchValue;

         const deletedVideoCounter = await Videos.countDocumentsWithDeleted({
            name: { $regex: searchValue, $options: 'i' },
            deleted: true,
            permanentlyDestroy: null,
         });

         // *, (, ), +, ?, [, \,

         const totalPages = Math.ceil(deletedVideoCounter / perPage);

         if (!currPage || currPage < 1) {
            currPage = 1;
         } else if (currPage > totalPages && totalPages > 0) {
            currPage = totalPages;
         }

         const skip = (currPage - 1) * perPage;

         const deletedVideoCounterAll = await Videos.countDocumentsWithDeleted({
            deleted: true,
            permanentlyDestroy: null,
         });

         const deletedVideos = await Videos.findWithDeleted({
            name: { $regex: searchValue, $options: 'i' },
            deleted: true,
            permanentlyDestroy: null,
         })
            .skip(skip)
            .limit(perPage);

         res.json({ deletedVideos, deletedVideoCounter, deletedVideoCounterAll });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new MeController();
