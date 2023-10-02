const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const clearText = document.getElementById("clear-text");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);

submitButton.addEventListener("click", submitData);

clearText.addEventListener("click", clearData);

function verifyTextLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    text_to_summarize: text_to_summarize,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/summarize", requestOptions)
    .then((response) => response.text()) // Response will be summarized text
    .then((summary) => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function clearData(){
  textArea.value = "";
  summarizedTextArea.value = "";
}