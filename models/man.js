// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");
const { json } = require("express/lib/response");
const sports = require("./sport.js");


var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var manSchema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  situation: { type: String, required: true, enum: ["En couple", "Celibataire"] },
  photo: { type: String, required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
  girlfriend: { type: mongoose.Schema.Types.ObjectId, ref: "women",required: false, unique: true },
  sport: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "sports",
    required: false,
  }],
});

manSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

manSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("men", manSchema);
