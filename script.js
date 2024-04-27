const cellItemRightElements = document.querySelectorAll(".cell-item-right");

cellItemRightElements.forEach((element) => {
  element.addEventListener("click", function () {
    const isAdmin = true;

    if (isAdmin) {
      const inputValue = element.textContent.trim();
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = inputValue;
      element.innerHTML = "";
      element.appendChild(inputField);

      inputField.focus();

      inputField.addEventListener("blur", function () {
        const newValue = inputField.value.trim();
        if (newValue !== "") {
          element.innerHTML = newValue;
        } else {
          element.innerHTML = inputValue;
        }
      });
    }
  });
});

function showDiscountedRepayment() {
  // Log to console or change the page content
  console.log("Discounted Repayment selected.");

  // Get both buttons
  var discountedButton = document
    .getElementById("discountedRepayment")
    .querySelector(".repay-btn-button");
  var directButton = document
    .getElementById("directRepayment")
    .querySelector(".repay-btn-button");

  // Toggle active class
  discountedButton.classList.add("active");
  directButton.classList.remove("active");
}

function showDirectRepayment() {
  // Log to console or change the page content
  console.log("Direct Repayment selected.");

  // Get both buttons
  var discountedButton = document
    .getElementById("discountedRepayment")
    .querySelector(".repay-btn-button");
  var directButton = document
    .getElementById("directRepayment")
    .querySelector(".repay-btn-button");

  // Toggle active class
  discountedButton.classList.remove("active");
  directButton.classList.add("active");
}

function toggleActiveState() {
  var discounted = document.getElementById("discountedRepayment");
  var direct = document.getElementById("directRepayment");
  if (discounted.classList.contains("active")) {
    discounted.classList.remove("active");
    discounted.classList.add("inactive");
    direct.classList.remove("inactive");
    direct.classList.add("active");
  } else {
    direct.classList.remove("active");
    direct.classList.add("inactive");
    discounted.classList.remove("inactive");
    discounted.classList.add("active");
  }
}
