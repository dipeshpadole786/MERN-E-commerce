const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { signup, login, cart, cartpost, cartRemove, payment, paymentprocces, addres, user_by_username, getOrder } = require("../controller/general");

router.post("/signup", signup)
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), login)
router.post("/cart/:id", cart);
router.post("/cart", cartpost);
router.post("/remove-from-cart", cartRemove);
router.post("/payment", payment);
router.get("/payment/:id", paymentprocces);
router.post("/address-save/:username", addres);
router.get("/getUser/:username", user_by_username);
router.get("/your-order/:username", getOrder);





module.exports = router;