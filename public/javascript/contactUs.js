// Get the Submit button from the DOM
const submitBtn = document.querySelector("#contactButton");
console.log("CLICKED &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

// Add an event listener to the button
submitBtn.addEventListener("click", (event) => {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Get the values from the form
const fullName = document.querySelector("#contact-name").value.trim();
const email = document.querySelector("#contact-email").value.trim();
const phone = document.querySelector("#contact-phone").value.trim();
const message = document.querySelector("#contact-message").value.trim();

  // If all the values are not empty
  if (fullName && email && phone && message) {
    // Fetch the route and send the data
    fetch("/api/contact", {
      method: "post",
      body: JSON.stringify({
        fullName,
        email,
        phone, // Include the phone number
        message,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // If the response is ok
      if (response.ok === true) {
        // Reset the form
        document.querySelector("#contactFormForJS").reset();
        // Alert the user
        window.alert("Message sent successfully");
      } else {
        alert(response.statusText);
      }
    });
  } else {
    // Alert the user if any required field is empty
    window.alert("Please fill out all required fields");
  }
});
