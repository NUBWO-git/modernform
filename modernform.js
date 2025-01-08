document.addEventListener('DOMContentLoaded', function () {
   const translateButton = document.getElementById('translateButton');
   const languageMenu = document.getElementById('languageMenu');

   // ฟังก์ชันตั้งค่าไอคอนในปุ่มเมนูภาษา
   function updateMenuIcons(selectedLang) {
      const buttons = document.querySelectorAll(`#languageMenu li button`);
      buttons.forEach(button => {
         const buttonLang = button.getAttribute('data-lang');
         const fullText = button.getAttribute('data-full-text'); // ดึงข้อความเต็มจาก data attribute
         if (buttonLang === selectedLang) {
            // เพิ่มไอคอนในปุ่มที่เลือก
            button.innerHTML = `${fullText} <span class="material-symbols-outlined">arrow_left</span>`;
         } else {
            // รีเซ็ตปุ่มอื่นๆ ให้ไม่มีไอคอน
            button.innerHTML = fullText;
         }
      });
   }

   if (translateButton && languageMenu) {
      // คลิกที่ปุ่มแสดง/ซ่อนเมนู
      translateButton.addEventListener('click', function () {
         const isMenuVisible = languageMenu.style.display === 'block';
         languageMenu.style.display = isMenuVisible ? 'none' : 'block';
      });

      // ตั้งค่าเริ่มต้นให้ En มีไอคอน
      updateMenuIcons('En');

      // ตั้งค่าเริ่มต้นให้ปุ่ม translateButton แสดงภาษาและไอคอน
      translateButton.innerHTML = '<img src="./img/En.png" alt="English Icon" class="icon"> En';
   }

   // ฟังก์ชันเลือกภาษา
   window.selectLanguage = function (lang) {
      // อัปเดตข้อความในปุ่มแปลภาษา (แสดงเฉพาะรหัสภาษา)
      translateButton.textContent = lang;

      // เพิ่มไอคอนที่แสดงภาษาที่เลือกในปุ่ม
      if (lang === 'Th') {
         translateButton.innerHTML = '<img src="./img/Th.png" alt="Thai Icon" class="icon"> Th';
      } else if (lang === 'En') {
         translateButton.innerHTML = '<img src="./img/En.png" alt="English Icon" class="icon"> En';
      }

      // ปิดเมนูภาษา
      languageMenu.style.display = 'none';

      // อัปเดตไอคอนในเมนู
      updateMenuIcons(lang);
   };
});
