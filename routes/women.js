var express = require("express");
var router = express.Router();

/* GET users listing. */
var woman_controller = require("../controllers/woman");

router.get("/", woman_controller.getAll);

router.get("/:id", woman_controller.getById);

router.put("/:id", woman_controller.update);

router.post("/", woman_controller.create);

router.delete("/:id", woman_controller.delete);

module.exports = router;