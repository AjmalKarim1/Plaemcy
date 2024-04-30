document.addEventListener("DOMContentLoaded", function () {
  const copyButtons = document.querySelectorAll(".copyBUt, .upiBut");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let textToCopy = "";
      if (this.classList.contains("upiBut")) {
        textToCopy = this.previousElementSibling.textContent; // Get text from previous sibling for 'upiBut'
      } else if (this.classList.contains("copyBUt")) {
        textToCopy = this.getAttribute("data-clipboard-text"); // Get text from data attribute for 'copyBUt'
      }

      // Attempt to copy the text to the clipboard
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const originalText = this.textContent; // Save the original button text
          this.textContent = "Copied!"; // Change the button text to "Copied!"
          setTimeout(() => {
            this.textContent = originalText; // Revert the text back after 2 seconds
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err); // Log error to console if copy fails
        });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const refnumInput = document.querySelector(".refnumBank");
  const submitButton = document.querySelector(".submitButBank");
  const warningMessage = document.getElementById("warningMessage");

  refnumInput.addEventListener("input", function () {
    const refnumValue = refnumInput.value.trim();

    if (refnumValue.length === 12 && /^\d{12}$/.test(refnumValue)) {
      // If the code is exactly 12 digits, enable the submit button
      submitButton.removeAttribute("disabled");
      warningMessage.textContent = ""; // Clear any previous warning messages
    } else {
      // If the code is not 12 digits, disable the submit button and show a warning message
      submitButton.setAttribute("disabled", true);
      warningMessage.textContent = "Please enter a 12-digit code.";
    }
  });
});
