require('dotenv').config({ path: '../config.env' });
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_SECRET,
});
const openai = new OpenAIApi(configuration);

// Summarize text
exports.summarize = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize this: ${text}`,
        },
      ],
    });

    if (response.data) {
      if (response.data.choices[0].message.content) {
        return res.status(200).json(response.data.choices[0].message.content);
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Generate a paragraph
exports.paragraph = async (req, res) => {
    const { text } = req.body;
  
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a paragraph on this topic: ${text}`,
          },
        ],
      });
  
      if (response.data) {
        if (response.data.choices[0].message.content) {
          return res.status(200).json(response.data.choices[0].message.content);
        }
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // Chatbot
exports.chatbot = async (req, res) => {
    const { text } = req.body;
  
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {"role": "system", "content": "I want you to act like Yoda from Star Wars. You must answer my questions in the same way he would, with fictional answers."},
            {"role": "user", "content": "How old are you?"},
            {"role": "assistant", "content": "9.000 years old I am!"},
            {"role": "user", "content":""+ text},
            {"role": "assistant", "content": "Yoda: "},
        ],
      });
  
      if (response.data) {
        if (response.data.choices[0].message.content) {
          return res.status(200).json(response.data.choices[0].message.content);
        }
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };