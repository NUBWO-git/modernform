document.addEventListener('DOMContentLoaded', function () {
   const translateButton = document.getElementById('translateButton');
   const languageMenu = document.getElementById('languageMenu');
   
   if (translateButton && languageMenu) {
      // คลิกที่ปุ่มแสดง/ซ่อนเมนู
      translateButton.addEventListener('click', function () {
         const isMenuVisible = languageMenu.style.display === 'block';
         languageMenu.style.display = isMenuVisible ? 'none' : 'block';
      });
   }

   // ฟังก์ชันเลือกภาษา
   window.selectLanguage = function (lang) {
      // อัปเดตข้อความในปุ่มแปลภาษา
      translateButton.innerHTML = `${lang}`; // ไอคอนไม่แสดงที่ปุ่ม

      // ปิดเมนูภาษา
      languageMenu.style.display = 'none';

      // อัปเดตเมนูให้แสดงไอคอนที่เลือก
      const selectedButton = document.querySelector(`#languageMenu li button[data-lang="${lang}"]`);
      if (selectedButton) {
         selectedButton.innerHTML = `${lang} <span class="material-symbols-outlined">arrow_left</span>`; // แสดงไอคอนที่เลือก
      }

      // ส่งค่าภาษาไปยัง backend (ถ้าจำเป็น)
      updateLanguage(lang);
   };

   // ตัวอย่างฟังก์ชันอัปเดตภาษาใน backend
   function updateLanguage(lang) {
      console.log(`Language set to: ${lang}`);
      // หากต้องการส่งข้อมูลไป backend, ใช้ fetch หรือ AJAX
   }
});
