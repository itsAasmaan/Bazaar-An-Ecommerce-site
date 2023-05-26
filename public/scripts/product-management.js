const deleteProductBtnElements = document.querySelectorAll(".product-item button");

for (const deleteProductElement of deleteProductBtnElements) {
  deleteProductElement.addEventListener("click", async (e) => {
    const productId = e.target.dataset.productid;
    const csrfToken = e.target.dataset.csrf;

    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
       method: "DELETE",
   })

   if(!response.ok){
     alert('Something went wrong!');
     return;
   }

   e.target.parentElement.parentElement.parentElement.parentElement.remove();
  });
}
