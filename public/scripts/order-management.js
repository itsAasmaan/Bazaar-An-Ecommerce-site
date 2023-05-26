const updateOrderFormElements = document.querySelectorAll(".order-action form");

for (const formElement of updateOrderFormElements) {
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const status = formData.get("status");
    const orderId = formData.get("orderid");
    const csrfToken = formData.get("_csrf");

    let response;

    try {
      response = await fetch(`/admin/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: status,
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

    form.parentElement.parentElement.querySelector(".badge").textContent =
      await responseData.status.toUpperCase();
  });
}
