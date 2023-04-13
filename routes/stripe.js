const { createCheckout, createWebhook, createPortal } = require('../controllers/stripe');
const { protect } = require('../middleware/auth');

module.exports = function(app){
    app.post('/checkout', protect, createCheckout);
    app.post('/webhook', createWebhook);
    app.post('/portal', protect, createPortal);
}