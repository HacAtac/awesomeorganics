// Function to handle the "Complete Order" button click
const handleCompleteOrderButtonClick = async (event) => {
  const button = event.target;
  const orderId = button.dataset.id; // Get the order ID from the data attribute
  const paymentStatus = "Paid"; // Set the payment status to "Paid"

  // Make an API call to update the payment status of the order
  const response = await fetch(`/api/orders/update-payment/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentStatus }), // Send the updated payment status in the request body
  });

  if (response.ok) {
    location.reload(); // Reload the page to reflect the updated payment status
  } else {
    alert("Failed to update payment status");
  }
};

// Add event listeners to all "Complete Order" buttons
const completeOrderButtons = document.querySelectorAll(
  ".complete-order-button"
);
completeOrderButtons.forEach((button) => {
  button.addEventListener("click", handleCompleteOrderButtonClick);
});

// Function to fetch and display the user's order history
const fetchOrderHistory = async () => {
  // Make an API call to get the user's order history
  const response = await fetch("/api/orders/");

  if (response.ok) {
    const orders = await response.json();

    // Render the order history
    const orderHistoryContainer = document.querySelector(".container");
    orders.forEach((order) => {
      // Render each order and its order items
      // This part depends on how you want to structure the HTML and render the orders
      // For example, you can create a table for each order, and table rows for each order item
    });
  } else {
    alert("Failed to fetch order history");
  }
};

// Fetch and display the user's order history on page load
fetchOrderHistory();
