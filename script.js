const email = document.getElementById("email");
const password = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const toggleText = document.getElementById("toggleText");
const toggleBtn = document.getElementById("toggleBtn");
const msg = document.getElementById("msg");

let isLogin = false;

toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  submitBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggleText.textContent = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  toggleBtn.textContent = isLogin ? "Sign Up" : "Login";
  msg.textContent = "";
});

submitBtn.addEventListener("click", () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (!emailValue || !passwordValue) {
    msg.textContent = "Both the fields are required!";
    return;
  }
  if (!emailValue.includes("@")) {
    msg.textContent = "Please enter a valid Email.";
    return;
  }
  if (passwordValue.length < 6) {
    msg.textContent = "Password is too short.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (isLogin) {
    // login
    const user = users.find(
      (u) => u.email === emailValue && u.password === passwordValue
    );
    if (user) {
      msg.textContent = "✅ Login Successful!";
      msg.classList.remove("text-red-600");
      msg.classList.add("text-green-600");
    } else {
      msg.textContent = "❌ Invalid Credentials!";
      msg.classList.remove("text-green-600");
      msg.classList.add("text-red-600");
    }
  }
  else {
  const alreadyExists = users.some((u) => u.email === emailValue);
  if (alreadyExists) {
    msg.textContent = "User already exists!";
    msg.classList.remove("text-green-600");
    msg.classList.add("text-red-600");
  } else {
    users.push({ email: emailValue, password: passwordValue });
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Signup successful! You can now log in.");

    msg.textContent = "✅ Signup successful! Please login.";
    msg.classList.remove("text-red-600");
    msg.classList.add("text-green-600");

    // Optional improvements:
    email.value = "";
    password.value = "";
    isLogin = true;
    toggleBtn.click(); // Switch to login form automatically
  }
}

  
});
