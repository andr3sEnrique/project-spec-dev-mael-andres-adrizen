import { createUser } from "./types/user.js";

const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  try {
    const res = await fetch("http://localhost:3009/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: {
        body: JSON.stringify(data),
      },
    });

    if (!res.ok) throw new Error("");
  } catch (err) {
    console.log(err);
  }
});
