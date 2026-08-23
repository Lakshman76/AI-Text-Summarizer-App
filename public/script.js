const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const clearText = document.getElementById("clear-text");
const summarizedTextArea = document.getElementById("summary");

// Disable submit button initially
submitButton.disabled = true;

// Check text length whenever user types
textArea.addEventListener("input", verifyTextLength);

// Submit text
submitButton.addEventListener("click", submitData);

// Clear text
clearText.addEventListener("click", clearData);

function verifyTextLength(e) {
  const textarea = e.target;

  const textLength = textarea.value.trim().length;

  if (textLength >= 200 && textLength < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function submitData() {
  const text_to_summarize = textArea.value.trim();

  if (!text_to_summarize) {
    return;
  }

  // Show loading state
  submitButton.classList.add("submit-button--loading");
  submitButton.disabled = true;

  try {
    const response = await fetch("/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text_to_summarize: text_to_summarize,
      }),
    });

    const summary = await response.text();

    if (!response.ok) {
      throw new Error(summary);
    }

    // Display summary
    summarizedTextArea.value = summary;
  } catch (error) {
    console.error("Frontend Error:", error);

    summarizedTextArea.value =
      "Sorry, something went wrong while summarizing the text.";
  } finally {
    // Stop loading animation
    submitButton.classList.remove("submit-button--loading");

    // Re-enable button if text is still valid
    verifyTextLength({
      target: textArea,
    });
  }
}

function clearData() {
  textArea.value = "";
  summarizedTextArea.value = "";
  submitButton.disabled = true;
}