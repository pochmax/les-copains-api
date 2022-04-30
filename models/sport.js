var mongoose = require("mongoose");

var sportSchema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },

  women: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "women",
      required: false,
      default: null,
    },
  ],

  men: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "men",
      required: false,
      default: null,
    },
  ],
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
