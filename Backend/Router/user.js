const { Router } = require("express");
const { getUser } = require("../controller/user");
const router = Router();
const a = 90;

router.get("/:username", getUser);

module.exports = router;