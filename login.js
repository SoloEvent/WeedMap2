async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  try {
    const res = await fetch("https://auth-worker.rdrc130.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("authToken", data.token);
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
      document.getElementById("password").value = "";
    }

  } catch (err) {
    errorMessage.textContent = "Server error. Please try again.";
  }
}