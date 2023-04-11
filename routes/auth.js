const { register, login, logout } = require('../controllers/auth');

module.exports = function(app){
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', login);
    app.post('/api/auth/logout', logout);
}
