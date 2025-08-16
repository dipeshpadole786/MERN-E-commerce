const { Router } = require("express");
const router = Router();
const { item, getdata, update, deletedata } = require("../controller/item");

router.get("/", item);
router.get("/:id", getdata)
router.put("/:id", update);
router.delete("/:id", deletedata);
module.exports = router;
