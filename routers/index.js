const { Router } = require("express");
const router = Router();
const authRouter = require("./authRouter");
const ticketRouter = require("./ticketRouter");
const movieRouter = require("./routeMovie");
const chatRouter = require("./chatRouter");

router.use("/auth", authRouter);
router.use("/tickets", ticketRouter);
router.use("/movies", movieRouter);
router.use("/messages", chatRouter);

module.exports = router;