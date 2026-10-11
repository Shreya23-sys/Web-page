const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("formStatus");

const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  role: document.getElementById("role"),
  terms: document.getElementById("terms")
};

const errors = {
  fullName: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmError"),
  role: document.getElementById("roleError"),
  terms: document.getElementById("termsError")
};

function setError(fieldName, message) {
  errors[fieldName].textContent = message;
  if (fields[fieldName] && fields[fieldName].type !== "checkbox") {
    fields[fieldName].setAttribute("aria-invalid", message ? "true" : "false");
  }
}

function validateForm() {
  let valid = true;
  Object.keys(errors).forEach((key) => setError(key, ""));

  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const confirmPassword = fields.confirmPassword.value;

  if (name.length < 2) {
    setError("fullName", "Please enter your full name.");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (password.length < 8) {
    setError("password", "Password must contain at least 8 characters.");
    valid = false;
  }

  if (confirmPassword !== password || confirmPassword.length === 0) {
    setError("confirmPassword", "The passwords do not match.");
    valid = false;
  }

  if (!fields.role.value) {
    setError("role", "Please select a role.");
    valid = false;
  }

  if (!fields.terms.checked) {
    setError("terms", "Please accept the terms and privacy policy.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";

  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]') ||
      (fields.terms.checked ? null : fields.terms);
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Front-end demo only: connect this point to your server/API to create accounts.
  statusMessage.textContent = "Your form is valid! Account creation needs to be connected to a backend.";
  statusMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

Object.entries(fields).forEach(([key, field]) => {
  if (field.type === "checkbox") {
    field.addEventListener("change", () => setError(key, ""));
  } else {
    field.addEventListener("input", () => {
      setError(key, "");
      if (key === "password" && fields.confirmPassword.value) {
        setError("confirmPassword",
          fields.confirmPassword.value === field.value ? "" : "The passwords do not match.");
      }
      if (key === "confirmPassword" && field.value) {
        setError("confirmPassword",
          field.value === fields.password.value ? "" : "The passwords do not match.");
      }
    });
    field.addEventListener("change", () => setError(key, ""));
  }
});

document.querySelectorAll(".visibility-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    const showing = target.type === "password";
    target.type = showing ? "text" : "password";
    button.setAttribute("aria-label", showing ? "Hide password" : "Show password");
    button.textContent = showing ? "⊘" : "◉";
  });
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("searchButton").addEventListener("click", () => {
  const query = window.prompt("What would you like to find on Kala Laya Nepal?");
  if (query && query.trim()) {
    alert("Search is a front-end placeholder. Connect it to your website search feature.");
  }
});

document.getElementById("loginButton").addEventListener("click", (event) => {
  event.preventDefault();
  alert("Connect this button to your login page (for example, login.html).");
});
