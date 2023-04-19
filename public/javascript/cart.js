// Function to handle the "Update" button click
const handleUpdateButtonClick = async (event) => {
  const button = event.target;
  const cartItemId = button.dataset.id; // Get the cart item ID from the data attribute
  const quantityInput =
    button.parentElement.parentElement.querySelector(".quantity-input");
  const newQuantity = quantityInput.value; // Get the updated quantity

  // Make an API call to update the cart item
  const response = await fetch(`/api/cart/update/${cartItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: newQuantity }), // Send the updated quantity in the request body
  });

  if (response.ok) {
    location.reload(); // Reload the page to reflect the updated quantity
  } else {
    alert("Failed to update cart item");
  }
};

// Function to handle the "Remove" button click
const handleRemoveButtonClick = async (event) => {
  const button = event.target;
  const cartItemId = button.dataset.id; // Get the cart item ID from the data attribute

  // Make an API call to remove the cart item
  const response = await fetch(`/api/cart/remove/${cartItemId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    location.reload(); // Reload the page to reflect the removed item
  } else {
    alert("Failed to remove cart item");
  }
};

// Add event listeners to all "Update" buttons
const updateButtons = document.querySelectorAll(".update-button");
updateButtons.forEach((button) => {
  button.addEventListener("click", handleUpdateButtonClick);
});

// Add event listeners to all "Remove" buttons
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", handleRemoveButtonClick);
});
