const { register, login, logout, getRefreshToken, getCustomer, getSubscription } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

module.exports = function(app){
    app.post('/register', register);
    app.post('/login', login);
    app.post('/logout', logout);
    app.get('/refresh-token', getRefreshToken);
    app.get('/subscription', protect, getSubscription);
    app.get('/customer', protect, getCustomer);
}