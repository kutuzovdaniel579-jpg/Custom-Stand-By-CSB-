document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("registerMessage");

  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Wachtwoorden komen niet overeen.";
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) throw new Error("Serverfout of netwerkprobleem");

    const data = await response.json();

    if (data.success) {
      message.style.color = "green";
      message.textContent = "Registratie geslaagd! Je kunt nu inloggen.";
      // window.location.href = "../login/index.html";
    } else {
      message.style.color = "red";
      message.textContent = "Registratie mislukt: " + (data.error || "Onbekende fout");
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Er ging iets mis: " + error.message;
  }
});
