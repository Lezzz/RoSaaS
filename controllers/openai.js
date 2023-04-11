require('dotenv').config({ path: '../config.env' });
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
