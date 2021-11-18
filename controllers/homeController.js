const { Op } = require('sequelize');
const { Movie } = require("../models");
const { formatDate } = require("../helpers/dateFormatter");
const formatMonetary = require("../helpers/monetaryFormatter")

//filter by genre
// - Drama
// - Action
// - Sci-fi
// - Biography
// - Adventure
// - Comedy

class HomeController {
    static readMovie(req, res) {
        // console.log(req.query.genre);
        const { genre, search } = req.query;
        const filterQuery = {}
        if (genre) filterQuery.genre = { [Op.eq]: genre }
        if (search) filterQuery.title = { [Op.iLike]: '%' + search + '%' }

        console.log(filterQuery);

        Movie.findAll({
            where: filterQuery,
            order: [['id']]
        })
            .then((data) => res.render("home", { data, user: req.session.user, formatDate, formatMonetary }))
            .catch((err) => res.send(err.message));
    }

}

module.exports = HomeController;