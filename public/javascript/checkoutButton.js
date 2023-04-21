// Function to handle the "Proceed to Checkout" button click
const handleCheckoutButtonClick = async () => {
  // Gather data from the cart
  const items = [];
  const cartItemsTableRows = document.querySelectorAll("tbody tr");
  let totalAmount = 0;

  cartItemsTableRows.forEach((row) => {
    const ProductId = parseInt(row.dataset.productId, 10); // Use the data-product-id attribute
    const quantity = parseInt(row.querySelector(".quantity-input").value, 1);
    const price = parseFloat(
      row.querySelector("td:nth-child(2)").textContent.replace("$", "")
    );
    const subtotal = parseFloat(
      row.querySelector("td:nth-child(4)").textContent.replace("$", "")
    );
    items.push({ ProductId, quantity, price });
    totalAmount += subtotal;
  });

  // Make an API call to create a new order and order items
  const response = await fetch(`/api/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, totalAmount }),
  });

  if (response.ok) {
    // Redirect to the order confirmation page or any other page as needed
    alert("Order placed successfully");
    location.href = "/order";
  } else {
    alert("Failed to place order");
  }
};

// Add event listener to the "Proceed to Checkout" button
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", handleCheckoutButtonClick);
