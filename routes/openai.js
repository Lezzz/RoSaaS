const express = require('express');
const router = express.Router();

const { summarize } = require('../controllers/openai');

router.post('/summary', summarize);

module.exports = router;
