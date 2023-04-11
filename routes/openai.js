const { summarize, paragraph, chatbot, jsConverter, imageGen } = require('../controllers/openai');

module.exports = function(app){
    app.post('/summary', summarize);
    app.post('/paragraph', paragraph);
    app.post('/chatbot', chatbot);
    app.post('/jsConvert', jsConverter);
    app.post('/imageGen', imageGen);
}