const express = require('express');
const { getCatBreedText, check8Words } = require('./controllers');
const router = express.Router();

// task 1
router.get('/v1/getCatBreedsText', getCatBreedText);
// task 2
router.post('/v2/checkWords', check8Words);

module.exports = router;