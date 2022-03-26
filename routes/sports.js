var express = require("express");
var router = express.Router();

/* GET users listing. */
var sport_controller = require("../controllers/sport");

router.get("/", sport_controller.getAll);

router.get("/:id", sport_controller.getById);

router.put("/:id", sport_controller.update);

router.post("/", sport_controller.create);

router.delete("/:id", sport_controller.delete);

module.exports = router;