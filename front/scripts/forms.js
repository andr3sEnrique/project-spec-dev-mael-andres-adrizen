import { createUser } from "./types/user.js";

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    try {
      const res = await fetch("http://localhost:3009/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorDiv = document.getElementById("error-login");
        errorDiv.innerHTML += "Invalid Credentials";
      }

      const user = createUser("", "");
      const json = await res.json();
      user.setToken(json.token);
      document.cookie = `token = ${user.token}; expires=${user.tokenEndDate}; path=/;`;
      window.location.replace("http://127.0.0.1:5500/front/index.html");
    } catch (err) {
      console.log(err);
    }
  });
}

const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    try {
      const res = await fetch("http://localhost:3009/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Something went wrong");

      const json = await res.json();
      window.location.replace("http://127.0.0.1:5500/front/components/login-form.html");
    } catch (err) {
      console.log(err);
    }
  });
}
