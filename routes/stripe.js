const { createCheckout, createWebhook } = require('../controllers/stripe');
const { protect } = require('../middleware/auth');

module.exports = function(app){
    app.post('/checkout', protect, createCheckout);
    app.post('/webhook', protect, createWebhook);
}