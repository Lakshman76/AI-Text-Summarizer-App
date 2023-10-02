require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const summarizeText = require("./summarize.js");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static("public"));

app.post("/summarize", (req, res) => {
    
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then((response) => {
      res.send(response); // Send the summary text as a response to the client
    })
    .catch((error) => {
      console.log(error.message);
    });

});

// Start the server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
