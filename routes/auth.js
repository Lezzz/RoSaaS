const { register, login, logout, getRefreshToken } = require('../controllers/auth');

module.exports = function(app){
    app.post('/register', register);
    app.post('/login', login);
    app.post('/logout', logout);
    app.get('/refresh-token', getRefreshToken);
}