const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const authForm = document.getElementById("authForm");
const nameField = document.getElementById("nameField");
const confirmField = document.getElementById("confirmField");
const nameInput = document.getElementById("name");
const confirmInput = document.getElementById("confirmPassword");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const switchBtn = document.getElementById("switchBtn");
const message = document.getElementById("message");

let signupMode = false;

function setMode() {
  message.textContent = "";
  message.className = "message";

  if (signupMode) {
    title.textContent = "Create Account ✨";
    subtitle.textContent = "Sign up to get started";
    nameField.style.display = "block";
    confirmField.style.display = "block";
    nameInput.required = true;
    confirmInput.required = true;
    passwordInput.autocomplete = "new-password";
    submitBtn.textContent = "Create Account";
    switchText.textContent = "Already have an account?";  
    switchBtn.textContent = "sign in";
  } else {
    title.textContent = "Welcome Back 👋";
    subtitle.textContent = "Login to continue to your account";
    nameField.style.display = "none";
    confirmField.style.display = "none";
    nameInput.required = false;
    confirmInput.required = false;
    passwordInput.autocomplete = "current-password";
    submitBtn.textContent = "login";
    switchText.textContent = "Don't have an account?";
    switchBtn.textContent = "login";
  }
}

switchBtn.addEventListener("click", () => {
  signupMode = !signupMode;
  authForm.reset();
  setMode();
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  message.className = "message";

  if (signupMode && passwordInput.value !== confirmInput.value) {
    message.textContent = "Passwords do not match.";
    message.classList.add("error");
    return;
  }

  message.textContent = signupMode
    ? "Signup successful! (Demo only)"
    : "Login successful! (Demo only)";
  message.classList.add("success");
});

setMode();
