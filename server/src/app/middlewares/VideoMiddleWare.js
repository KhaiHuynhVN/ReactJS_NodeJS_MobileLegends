class VideoMiddleWare {
   // POST /videos/store
   store(req, res, next) {
      const formData = { ...req.body };
      formData.img = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
      res.formData = formData;
      next();
   }
}

module.exports = new VideoMiddleWare();
