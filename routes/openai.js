const { summarize, paragraph, chatbot } = require('../controllers/openai');

module.exports = function(app){
    app.post('/summary', summarize);
    app.post('/paragraph', paragraph);
    app.post('/chatbot', chatbot);
}