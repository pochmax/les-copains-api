var mongoose = require("mongoose");
const { DateTime } = require("luxon");
const sports = require("./sport.js");

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var womanSchema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  situation: {
    type: String,
    required: true,
    enum: ["En couple", "Célibataire"],
  },
  photo: { type: String, required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
  boyfriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "men",
    required: false,
    default: null,
  },
  sport: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sports",
      required: false,
      default: null,
    },
  ],
});

womanSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

womanSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("women", womanSchema);
