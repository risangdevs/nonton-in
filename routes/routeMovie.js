const express = require("express");
const MovieController = require("../controllers/movieController");
const router = express.Router();

// session middleware
router.use((req, res, next) => {
    !req.session.user?.id ? res.redirect('/auth/login') : next()
})

router.get("/", MovieController.listTickets);
router.get("/buyticket/:MovieId", MovieController.getTicketAddForm);
router.post("/buyticket/:MovieId", MovieController.postTicketAddForm);
router.get("/:ticketId/cancel", MovieController.destroyTicket);

module.exports = router;