const { summarize } = require('../controllers/openai');

module.exports = function(app){
    app.post('/summary', summarize);
}