const view = require('../controller/post')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new',view.GET_postCreate);
router.post('/new',view.POST_postCreate);
router.get('/:id', view.GET_postDetail);

module.exports = router;
