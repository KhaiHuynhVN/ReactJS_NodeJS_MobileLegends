const express = require('express');
const router = express.Router();

const videoController = require('../app/controllers/VideosController');
const videoMiddleWare = require('../app/middlewares/VideoMiddleWare');

router.post('/store', videoMiddleWare.store, videoController.store);
router.get('/trash-form-actions', videoController.trashFormActions);
router.get('/form-actions', videoController.formActions);
router.put('/permanentlyDestroy/:id', videoController.permanentlyDestroy);
router.put('/restore/:id', videoController.restore);
router.delete('/delete/:id', videoController.delete);
router.patch('/update/:id', videoController.update);
router.get('/edit/:id', videoController.edit);
router.get('/:id', videoController.show);

module.exports = router;
