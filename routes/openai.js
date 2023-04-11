const { summarize } = require('../controllers/openai');

module.exports = function(app){
    app.post('/api/openai/summary', summarize);
}
