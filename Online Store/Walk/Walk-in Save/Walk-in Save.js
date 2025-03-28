document.addEventListener("DOMContentLoaded", function () {
   const imageInput = document.getElementById("image");
   const preview = document.createElement("img");
   preview.style.maxWidth = "200px";
   preview.style.display = "none";
   imageInput.parentNode.appendChild(preview);

   imageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
         const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
         if (!allowedExtensions.includes(file.type)) {
            alert("กรุณาอัปโหลดไฟล์ .jpg, .jpeg, .png หรือ .gif เท่านั้น");
            imageInput.value = "";
            preview.style.display = "none";
            return;
         }

         if (file.size > 5 * 1024 * 1024) { // 5MB
            alert("ขนาดไฟล์ต้องไม่เกิน 5MB");
            imageInput.value = "";
            preview.style.display = "none";
            return;
         }

         const reader = new FileReader();
         reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
         };
         reader.readAsDataURL(file);
      }
   });
});