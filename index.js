require("dotenv").config();

const express = require("express");
const path = require("path");
const summarizeText = require("./summarize.js");

const app = express();

const PORT = process.env.PORT || 4000;

// Parse JSON request bodies
app.use(express.json());

// Serve files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Summarization API
app.post("/summarize", async (req, res) => {
    try {
      const text = req.body.text_to_summarize;

      // Validate input
      if (!text || typeof text !== "string") {
        return res.status(400).send("Please provide text to summarize.");
      }

      if (text.trim().length < 200) {
        return res
          .status(400)
          .send("Text must contain at least 200 characters.");
      }

      console.log("Received text for summarization...");

      const summary = await summarizeText(text);

      res.send(summary);
    } catch (error) {
      console.error("Summarization error:", error.message);

      res.status(500).send("Failed to summarize the text.");
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});