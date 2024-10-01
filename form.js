const forms = document.querySelectorAll(".step-form");
const steps = document.querySelectorAll(".navbar .step li");
let currentFormIndex = 0;
document.getElementById("form-message").innerText =
  "Form submitted successfully!";

// Event listener for all buttons with data-action
document.querySelectorAll("[data-action]").forEach((button) => {
  // console.log(button);
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const action = this.getAttribute("data-action");

    if (action === "next") {
      if (!validateForm()) return;

      // Save form data in cookies
      setCookie("firstName", document.getElementById("f-name").value, 7);
      setCookie("lastName", document.getElementById("l-name").value, 7);
      setCookie("email", document.getElementById("email").value, 7);
      setCookie("dateOfBirth", document.getElementById("date").value, 7);
      setCookie("address", document.getElementById("address").value, 7);

      changeForm(1);
    } else if (action === "back") {
      changeForm(-1);
    } else if (action === "submit") {
      if (!validateForm()) return;
      // After successful submit, clear cookies
      eraseCookie("firstName");
      eraseCookie("lastName");
      eraseCookie("email");
      eraseCookie("dateOfBirth");
      eraseCookie("address");
      // show mssge when submit
      showMessage("Form submitted successfully 🥳", "success");
    }
  });
  // Function to change form and update navigation
  function changeForm(direction) {
    hideMessage();
    forms[currentFormIndex].style.left = direction === 1 ? "-550px" : "550px";

    steps[currentFormIndex].classList.remove("active");

    currentFormIndex += direction;

    forms[currentFormIndex].style.left = "60px";
    steps[currentFormIndex].classList.add("active");
  }
});
// On page load, retrieve form data from cookies
window.onload = function () {
  document.getElementById("f-name").value = getCookie("firstName") || "";
  document.getElementById("l-name").value = getCookie("lastName") || "";
  document.getElementById("email").value = getCookie("email") || "";
  document.getElementById("date").value = getCookie("dateOfBirth") || "";
  document.getElementById("address").value = getCookie("address") || "";
};

// Function to validate the form
function validateForm() {
  const firstName = document.getElementById("f-name");
  const lastName = document.getElementById("l-name");
  const dateOfBirth = document.getElementById("date");
  const email = document.getElementById("email");
  const address = document.getElementById("address");

  if (currentFormIndex === 0) {
    if (
      !firstName.value.trim() ||
      !lastName.value.trim() ||
      !validateEmail(email.value) ||
      !dateOfBirth.value ||
      !address.value.trim()
    ) {
      showMessage("Please fill in all required fields 😓", "error");
      return false;
    }
  }
  return true;
}

// Email validation function
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to erase a cookie
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
// function for show mssg
function showMessage(message, type) {
  const messageDiv = document.getElementById("form-message");
  messageDiv.innerText = message;

  // message classes
  if (type === "success") {
    messageDiv.classList.remove("error");
    messageDiv.classList.add("success");
  } else if (type === "error") {
    messageDiv.classList.remove("success");
    messageDiv.classList.add("error");
  }
  messageDiv.style.display = "block";
}
// hide message
function hideMessage() {
  const messageDiv = document.getElementById("form-message");
  messageDiv.style.display = "none";
}
