// Function to handle the "Add to cart" button click
const handleAddToCartButtonClick = async (event) => {
  const button = event.target;
  const productCard = button.closest(".product-card"); // Get the parent product card element
  const ProductId = productCard.dataset.id; // Get the product ID from the data attribute
  const quantityInput = productCard.querySelector(".quantity-input");
  const quantity = quantityInput.value; // Get the selected quantity

  // Make an API call to add the product to the cart
  const response = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ProductId, quantity }), // Send the product ID and quantity in the request body
  });

  if (response.ok) {
    alert("Product added to cart");
  } else {
    alert("Failed to add product to cart");
  }
};

// Add event listeners to all "Add to cart" buttons
const addToCartButtons = document.querySelectorAll("#add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", handleAddToCartButtonClick);
});
