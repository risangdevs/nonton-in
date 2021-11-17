const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");


router.get("/logout", UserController.logout);

// session middleware
router.use((req, res, next) => {
    req.session.user?.id ? res.redirect('/') : next()
})

router.get("/register", UserController.getRegisterForm);
router.post("/register", UserController.postRegisterForm);
router.get("/login", UserController.getLoginForm);
router.post("/login", UserController.postLoginForm);

module.exports = router;