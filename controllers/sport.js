var Sport = require("../models/sport");

const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  // body("id")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Id must be specified.")
  //   .isNumeric()
  //   .withMessage("Id must be a number."),

  body("name")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  body("desc")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create man object with escaped and trimmed data
    var sport = new Sport({
      _id: req.body.id,
      name: req.body.name,
      desc: req.body.desc,
      men: req.body.men,
      women: req.body.women,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      sport.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Sport created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Sport.find()
    .populate("men")
    .populate("women")
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Sport.findById(req.params.id)
        // .populate("men")
        .populate("women")
        .populate("men")
        .exec(function (err, result) {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json(result);
        });
    }
  },
];

// Delete
exports.delete = [
  // param("id")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Id must be specified.")
  //   .isNumeric()
  //   .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Sport.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Sport deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  // body("id")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Id must be specified.")
  //   .isNumeric()
  //   .withMessage("Id must be a number."),

  body("name")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  body("desc")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create man object with escaped and trimmed data
    var sport = new Sport({
      _id: req.body.id,
      name: req.body.name,
      desc: req.body.desc,
      men: req.body.men,
      women: req.body.women,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Sport.findByIdAndUpdate(req.params.id, sport, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Sport updated successfully !");
      });
    }
  },
];
