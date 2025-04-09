document.getElementById('uploadForm').addEventListener('submit', function(event) {
   event.preventDefault(); // หยุดการส่งฟอร์มปกติ

   var formData = new FormData(this);

   fetch('e_catalogue.php', {
      method: 'POST',
      body: formData
   })
   .then(response => response.text())
   .then(data => {
      document.getElementById('result').innerHTML = data;
      loadGallery(); // รีเฟรชแกลเลอรีหลังจากอัปโหลด
   })
   .catch(error => {
      console.error('Error:', error);
   });
});

// ฟังก์ชันโหลดแกลเลอรีรูปภาพ
function loadGallery() {
   fetch('e_catalogue.php')
   .then(response => response.text())
   .then(data => {
      document.getElementById('gallery').innerHTML = data;
   });
}

// โหลดแกลเลอรีเมื่อโหลดหน้า
loadGallery();
