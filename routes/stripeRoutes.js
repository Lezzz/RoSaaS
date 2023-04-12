const express = require('express');
const stripeController = require('../controllers/stripe');

module.exports = function(app) {
    app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeController.createWebhook);
};
