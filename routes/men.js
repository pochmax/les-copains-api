var express = require("express");
var router = express.Router();

/* GET users listing. */
var man_controller = require("../controllers/man");

router.get("/", man_controller.getAll);

router.get("/:id", man_controller.getById);

router.put("/:id", man_controller.update);

router.post("/", man_controller.create);

router.delete("/:id", man_controller.delete);

module.exports = router;
