const express = require('express')
const router = express.Router()
const novelController = require('../Controllers/novelController')

router.get('/', novelController.novelList)
router.get('/add', novelController.getaddNovel)
router.post('/add', novelController.postaddNovel)
router.get('/:id/detail', novelController.novelDetail)
router.get('/:id/detail/edit', novelController.getEditNovel)
router.post('/:id/detail/edit', novelController.postEditNovel)
router.get('/:id/delete', novelController.deleteNovel)
router.get('/subscribe/:id', novelController.subscribe)





module.exports = router
