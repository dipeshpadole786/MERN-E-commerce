const { Router } = require("express");
const { getUser } = require("../controller/user");
const router = Router();

router.get("/:username", getUser);

module.exports = router;