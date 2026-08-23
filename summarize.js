const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.ACCESS_TOKEN);

async function summarizeText(text) {
  try {
    const result = await client.summarization({
      model: "facebook/bart-large-cnn",
      inputs: text,
      parameters: {
        max_length: 100,
        min_length: 30,
      },
    });

    return result.summary_text;
  } catch (error) {
    console.error("Hugging Face API Error:");
    console.error(error.message);

    throw error;
  }
}

module.exports = summarizeText;
