const cartUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

for (const formElement of cartUpdateFormElements) {
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = e.target.dataset.productid;
    const csrfToken = e.target.dataset.csrf;
    const quantity = e.target.firstElementChild.value;

    let response;
    try {
      response = await fetch("/cart/items", {
        method: "PATCH",
        body: JSON.stringify({
          productId,
          quantity,
          _csrf: csrfToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert("Unable to update the cart!");
      return;
    }

    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    const responseData = await response.json();

    if (responseData.updatedCartData.updatedItemPrice === 0) {
      await e.target.parentElement.parentElement.remove();
    } else {
      const cartItemPriceElement =
        e.target.parentElement.querySelector(".cart-item-price");
      cartItemPriceElement.textContent =
        responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }

    cartTotalPriceElement.textContent =
      responseData.updatedCartData.newTotalPrice.toFixed(2);

    for (const cartBadgeElement of cartBadgeElements) {
      cartBadgeElement.textContent =
      await responseData.updatedCartData.newTotalQuantity;
    }
  });
}
