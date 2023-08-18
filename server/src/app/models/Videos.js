const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Videos = new Schema(
   {
      name: { type: String, require: true },
      description: { type: String, require: true },
      img: { type: String, require: true },
      videoId: { type: String, require: true },
      slug: { type: String, slug: ['name', '_id'], unique: true },
      permanentlyDestroy: { type: Boolean },
      restoreAt: { type: Date },
   },
   {
      timestamps: true,
   },
);

// Add plugins
mongoose.plugin(slug);
Videos.plugin(mongooseDelete, {
   overrideMethods: 'all',
   deletedAt: true,
});

const videosModel = mongoose.model('Videos', Videos);

module.exports = videosModel;
