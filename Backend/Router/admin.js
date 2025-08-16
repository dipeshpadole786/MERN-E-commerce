const { Router } = require("express");
const router = Router();
const { getProduct, additem, dashboard } = require("../controller/admin");

router.get("/product-order-count", getProduct);
router.post("/add-item", additem);
router.get("/dashboard-summary", dashboard);


module.exports = router;
