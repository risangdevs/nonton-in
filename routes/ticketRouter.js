const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");

// session middleware
router.use((req, res, next) => {
    !req.session.user?.id ? res.redirect('/auth/login') : next()
})

router.get("/", TicketController.listTickets);
router.get("/buyticket/:MovieId", TicketController.getTicketAddForm);
router.post("/buyticket/:MovieId", TicketController.postTicketAddForm);
router.get("/:ticketId/cancel", TicketController.destroyTicket);

module.exports = router;