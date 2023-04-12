const express = require('express');
const stripeController = require('../controllers/stripe');

module.exports = function(app) {
    app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
        console.log('Webhook route hit'); // Add this log
        stripeController.createWebhook(req, res, next);
      });
      
};
