var Woman = require("../models/woman");

const { param, body, validationResult } = require("express-validator");
const men = require("./sport.js");

// Create
exports.create = [
  //Check validation
  // body("id")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape()
  //   .withMessage("Id must be specified."),

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  body("situation")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Situation must be specified."),

  body("photo")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Situation must be specified."),

  body("boyfriend")
    .optional()
    .isLength({ min: 1 })
    .isObject()
    .withMessage("boyfriend must be an object"),

    body("sport")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Sport must be specified.")
    .isObject()
    .withMessage("Sport must be an array"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);


    // Create man object with escaped and trimmed data
    var woman = new Woman({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        situation: req.body.situation,
        photo: req.body.photo,
        dateOfBirth: req.body.dateOfBirth,
        boyfriend: req.body.boyfriend,
        sport : req.body.sport
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      woman.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Woman created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Woman.find().exec(function (err, result) {
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
      Woman.findById(req.params.id).exec(function (err, result) {
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
      Woman.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Woman deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified."),

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  body("situation")
    .isLength({ min: 1 })
    .escape()
    .withMessage("Situation must be specified."),

    body("photo")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Situation must be specified."),

  body("boyfriend")
    .optional()
    .isLength({ min: 1 })
    .isObject()
    .withMessage("Boyfriend must be an array"),

  body("sport")
    .isLength({ min: 1 })
    .withMessage("Sport must be specified.")
    .isArray()
    .withMessage("Sport must be an object"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create man object with escaped and trimmed data
    var woman = new Woman({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        situation: req.body.situation,
        photo: req.body.photo,
        dateOfBirth: req.body.dateOfBirth,
        boyfriend: req.body.boyfriend,
        sport : req.body.sport
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Woman.findByIdAndUpdate(req.params.id, woman, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Woman updated successfully !");
      });
    }
  },
];