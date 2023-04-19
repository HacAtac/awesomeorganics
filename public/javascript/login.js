// Select the login form
const loginForm = document.querySelector(".login-form");

// Add event listener to the login form's submit event
loginForm.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values entered by the user
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#password-login").value;

  // Create the login data object
  const loginData = {
    username,
    password,
  };

  try {
    // Send a POST request to the login endpoint with the login data
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response
    const responseData = await response.json();

    if (response.ok) {
      console.log(responseData);
      // Login was successful, redirect to the desired page
      window.location.href = "/";
    } else {
      // Display an error message to the user
      alert(responseData.message || "Error logging in. Please try again.");
    }
  } catch (error) {
    // Handle any network or server errors
    alert("An error occurred. Please try again.");
  }
});
