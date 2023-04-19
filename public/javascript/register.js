// Select the registration form
const signupForm = document.querySelector(".signup-form");

// Add event listener to the registration form's submit event
signupForm.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values entered by the user
  const username = document.querySelector("#username").value;
  const fullName = document.querySelector("#fullName").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const password = document.querySelector("#password").value;

  // Create the registration data object
  const registrationData = {
    username,
    fullName,
    email,
    phone,
    password,
  };

  try {
    // Send a POST request to the registration endpoint with the registration data
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registrationData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response
    const responseData = await response.json();

    if (response.ok) {
      // Registration was successful, redirect to the desired page
      window.location.href = "/login";
    } else {
      // Display an error message to the user
      alert(responseData.message || "Error registering. Please try again.");
    }
  } catch (error) {
    // Handle any network or server errors
    alert("An error occurred. Please try again.");
  }
});
