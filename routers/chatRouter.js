const express = require("express");
const router = express.Router();
const ChatRoomController = require("../controllers/chatRoomController");

// session middleware
router.use((req, res, next) => {
    !req.session.user?.id ? res.redirect('/auth/login') : next()
})

router.get("/", ChatRoomController.getMessages);
router.post("/", ChatRoomController.createMessage);

module.exports = router;