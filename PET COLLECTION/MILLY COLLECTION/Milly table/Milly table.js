document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('form');
   const imageInput = document.querySelector('#image');
   const nameInput = document.querySelector('#name');
   const categoryInput = document.querySelector('#category');
   const submitButton = document.querySelector('button');

   form.addEventListener('submit', function (e) {
      e.preventDefault(); // หยุดการส่งฟอร์มทันที

      // ตรวจสอบว่ามีการกรอกข้อมูลครบหรือไม่
      if (!imageInput.files.length) {
         alert("กรุณาเลือกภาพที่ต้องการอัปโหลด");
         return;
      }

      if (nameInput.value.trim() === "") {
         alert("กรุณากรอกชื่อ");
         return;
      }

      if (categoryInput.value === "") {
         alert("กรุณาเลือกหมวดหมู่");
         return;
      }

      // สร้าง FormData เพื่อส่งข้อมูล
      const formData = new FormData(form);

      // สร้าง XMLHttpRequest สำหรับการส่งข้อมูลแบบ Ajax
      const xhr = new XMLHttpRequest();
      xhr.open("POST", form.action, true);

      // เมื่อการอัปโหลดสำเร็จ
      xhr.onload = function () {
         if (xhr.status === 200) {
            alert("การอัปโหลดสำเร็จ");
            // คุณสามารถใช้ข้อมูลที่ส่งกลับจาก PHP ได้ที่นี่
         } else {
            alert("เกิดข้อผิดพลาดในการอัปโหลด");
         }
      };

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      xhr.send(formData);
   });
});
