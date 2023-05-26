const imageInputElement = document.querySelector("#image-control input");
const imagePreviewElement = document.querySelector("#image-control img");

imageInputElement.addEventListener("change", () => {
  const files = imageInputElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const imageFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(imageFile);
  imagePreviewElement.style.display = "block";
});
