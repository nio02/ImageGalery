document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".image-box img").forEach((img) => {
      img.onload = () => {
        const figure = img.closest(".image-box");
        if (img.naturalHeight > 1200) {
          figure.classList.add("row-span-2");
        }
      };
    });
});