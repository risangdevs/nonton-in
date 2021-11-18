const { Ticket, Movie } = require("../models/");
const formatMonetary = require("../helpers/monetaryFormatter")
const { formatDate, formatTime } = require("../helpers/dateFormatter")

class TicketController {
    static listTickets(req, res) {
        const params = { UserId: req.session.user?.id }
        const { message } = req.query
        Ticket.findAll({ where: params, include: 'Movie' })
            .then((data) => res.render("ticket/listTicket", { data, message, user: req.session.user, formatMonetary, formatDate, formatTime }))
            .catch((err) => res.send(err));
    }

    static getTicketAddForm(req, res) {
        const { MovieId } = req.params;
        const params = { id: MovieId }
        const { message, error } = req.query;

        Movie.findOne({
            where: params, include: {
                model: Ticket,
                require: false
            }
        })
            .then((data) => {
                const seatRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
                const bookedSeat = []
                for (const rowCode of seatRow) {
                    let temp = []
                    for (let i = 1; i <= 8; i++) {
                        let flag = false
                        data.Tickets.forEach(seat => {
                            if (rowCode == seat.seatNumber[0] && i == seat.seatNumber[1]) {
                                temp.push(seat.seatNumber)
                                flag = true;
                            }
                        })
                        if (!flag) temp.push(null)
                    }
                    bookedSeat.push(temp)
                }
                res.render("ticket/buyTicket", { data, message, error, bookedSeat, user: req.session.user });
            })
            .catch((err) => res.send(err));
    }

    static postTicketAddForm(req, res) {
        const { UserId, seatNumber, date, time } = req.body;
        const { MovieId } = req.params;
        const dateParams = (date && time) ? `${date.split('-')},${time.split(':')}`.split(",") : ''
        const showTime = dateParams ? new Date(dateParams[2], dateParams[1], dateParams[0], dateParams[3], dateParams[4]) : ''
        const params = { UserId, MovieId, seatNumber: seatNumber ? seatNumber : '', showTime }
        Movie.findOne({ where: { id: MovieId } })
            .then((data) => {
                params.price = data.price ? data.price : 0
                return Ticket.create(params)
            })
            .then(() => res.redirect("/tickets"))
            .catch((err) => {
                console.log(err);
                res.redirect(`/tickets/buyticket/${MovieId}?error=${err.message.split('\n').map(el => el.replace("Validation error: ", "")).join(".")}`)
            });
    }

    static destroyTicket(req, res) {
        const { ticketId } = req.params
        const params = { id: ticketId, UserId: req.session.user?.id }
        Ticket.findOne({ where: params })
            .then((data) => {
                const message = `Ticket with number ${data.ticketNumber} was canceled!`
                return message      // added this line & commenting 2 lines below
                // Ticket.destroy({ where: params })
                //     .then(() => res.redirect(`/tickets/?message=${message}`))
            })
            .then((message)=>{      // added 3 lines (75,76,77) to fix nested promise
                Ticket.destroy({ where: params })
                    .then(() => res.redirect(`/tickets/?message=${message}`))
            })
            .catch((err) => res.send(err));
    }
}

module.exports = TicketController;