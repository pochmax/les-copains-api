var mongoose = require("mongoose");


var sportSchema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  photo: { type: String, required: true },
});

sportSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

sportSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("sports", sportSchema);