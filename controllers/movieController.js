const { Movie } = require("../models")
const formatMonetary = require("../helpers/monetaryFormatter")

class movieController {
    static readMovie(req, res) {
        Movie.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then((data) => { res.render('movies/showMovies', { data, user: req.session.user, formatMonetary }) })
            .catch((err) => { res.send(err.message) })
    }

    static createFormMovie(req, res) {
        res.render('movies/formAddMovie', { user: req.session.user })
    }

    static postCreateFormMovie(req, res) {

        let newMovies = {
            title: req.body.title,
            movieUrl: req.body.movieUrl,
            ratingMovie: req.body.ratingMovie,
            genre: req.body.genre,
            description: req.body.description,
            releaseDate: req.body.date,
            price: +req.body.price,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log(newMovies)
        Movie.create(newMovies)
            .then((data) => { res.redirect('/movies') })
            .catch((err) => { res.send(err) })
    }

    static editFormMovie(req, res) {
        let id = req.params.movieId
        Movie.findByPk(id)
            .then((data) => { res.render('movies/formEditMovies', { data, user: req.session.user }) })
            .catch((err) => res.send(err))
    }

    static postEditFormMovie(req, res) {
        console.log(req.body)
        let id = req.params.movieId
        let newMovies = {
            title: req.body.title,
            movieUrl: req.body.movieUrl,
            ratingMovie: req.body.ratingMovie,
            genre: req.body.genre,
            description: req.body.description,
            releaseDate: req.body.date,
            price: +req.body.price,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Movie.update(newMovies, { where: { id: id } })
            .then((data) => { res.redirect('/movies') })
            .catch((err) => { res.send(err) })
    }

    static destroyMovie(req, res) {
        let id = req.params.movieId
        // console.log(id)
        Movie.destroy({ where: { id: id } })
            .then(() => { res.redirect('/movies') })
            .catch((err) => { res.send(err) })
    }
}

module.exports = movieController