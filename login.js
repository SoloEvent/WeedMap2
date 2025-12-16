async function handleLogin(event) {
  event.preventDefault();
  console.log("Login function called");

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  console.log("Username:", username);
  console.log("Password:", password);

  try {
    console.log("Sending request to worker...");
    const res = await fetch("https://auth-worker.rdrc130.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (data.success) {
      console.log("Login successful!");
      sessionStorage.setItem("sahpAuthenticated", "true");
      window.location.href = "index.html";
    } else {
      console.log("Login failed");
      errorMessage.textContent = "Invalid username or password.";
      document.getElementById("password").value = "";
    }

  } catch (err) {
    console.error("Login error:", err);
    errorMessage.textContent = "Server error. Please try again.";
  }
}