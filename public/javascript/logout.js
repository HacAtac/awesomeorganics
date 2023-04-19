// Async function to handle logout
async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/"); // Redirect to home page
  } else {
    alert(response.statusText);
  }
}

// Add event listener to the element with the ID "logout"
document.querySelector("#logout").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default behavior of the link
  logout(); // Call the logout function
});
