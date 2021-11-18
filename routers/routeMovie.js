const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

// session middleware
router.use((req, res, next) => {
    req.session.user?.id && (req.session.user?.role == 'admin') ? next() : res.redirect('/')
})

router.get('/', movieController.readMovie)
router.get('/add', movieController.createFormMovie)
router.post('/add', movieController.postCreateFormMovie)
router.get('/:movieId/edit', movieController.editFormMovie)
router.post('/:movieId/edit', movieController.postEditFormMovie)
router.get('/:movieId/delete', movieController.destroyMovie)

module.exports = router