const Videos = require('../models/Videos');

class VideosController {
   // POST /videos/store
   async store(req, res, next) {
      try {
         const small = new Videos(res.formData);
         await small.save();
         res.json('Video saved!');
      } catch (error) {
         next(error);
      }
   }

   // GET /videos/show
   async show(req, res, next) {
      try {
         const video = await Videos.findOne({ slug: req.params.id });
         res.json(video);
      } catch (error) {
         next(error);
      }
   }

   // GET /videos/edit/:id
   async edit(req, res, next) {
      try {
         const video = await Videos.findOne({ _id: req.params.id });
         res.json(video);
      } catch (error) {
         next(error);
      }
   }

   // PATCH /videos/update/:id
   async update(req, res, next) {
      try {
         const formData = { ...req.body };
         await Videos.updateOne({ _id: req.params.id }, formData);
         res.json('Updated video!');
      } catch (error) {
         next(error);
      }
   }

   // DELETE /videos/delete/:id
   async delete(req, res, next) {
      try {
         await Videos.delete({ _id: req.params.id });
         res.json('Deleted video!');
      } catch (error) {
         next(error);
      }
   }

   // PUT /videos/restore/:id
   async restore(req, res, next) {
      try {
         await Videos.updateOneDeleted(
            { _id: req.params.id },
            { $unset: { deletedAt: true }, restoreAt: Date.now(), deleted: false },
         );
         res.json('Restored video!');
      } catch (error) {
         next(error);
      }
   }

   // PUT /videos/permanentlyDestroy/:id
   async permanentlyDestroy(req, res, next) {
      try {
         await Videos.updateOneDeleted({ _id: req.params.id }, { permanentlyDestroy: true });
         res.json('Permanently destroyed video!');
      } catch (error) {
         next(error);
      }
   }

   // GET /videos/form-actions
   async formActions(req, res, next) {
      if (!req.query.videoIds || !req.query.videoIds.length) {
         res.json({ error: 'Đừng cố thực hiện hành vi này!' });
         return;
      }

      switch (req.query.action) {
         case 'delete':
            try {
               await Videos.delete({ _id: { $in: req.query.videoIds } });
            } catch (error) {
               next(error);
            }
            break;
         default:
            res.json({ error: 'Invalid action' });
            return;
      }

      res.json('Deleted videos!');
   }

   // GET /videos/trash-form-actions
   async trashFormActions(req, res, next) {
      if (!req.query.videoIds || !req.query.videoIds.length) {
         res.json({ error: 'Đừng cố thực hiện hành vi này!' });
         return;
      }

      switch (req.query.action) {
         case 'permanentlyDestroy':
            try {
               await Videos.updateManyDeleted(
                  { _id: { $in: req.query.videoIds } },
                  { permanentlyDestroy: true },
               );
            } catch (error) {
               next(error);
            }
            break;
         case 'restore':
            try {
               await Videos.updateManyDeleted(
                  { _id: { $in: req.query.videoIds } },
                  { $unset: { deletedAt: true }, deleted: false, restoreAt: Date.now() },
               );
            } catch (error) {
               next(error);
            }
            break;
         default:
            res.json({ error: 'Invalid action' });
            return;
      }

      res.json(`Successfully ${req.query.action} videos!`);
   }
}

module.exports = new VideosController();
