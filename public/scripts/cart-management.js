const addCartToBtnElement = document.querySelector("#product-details button");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

addCartToBtnElement.addEventListener("click", async () => {
  const productId = addCartToBtnElement.dataset.productid;
  const csrfToken = addCartToBtnElement.dataset.csrf;

  let response;

  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalQuantity;

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = await newTotalQuantity;
  }
});
