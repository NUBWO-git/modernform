document.addEventListener('DOMContentLoaded', function() {
   const translateButton = document.getElementById('translateButton');
   const languageMenu = document.getElementById('languageMenu');

   if (translateButton && languageMenu) {
      translateButton.addEventListener('click', function() {
         languageMenu.style.display = (languageMenu.style.display === 'none' || languageMenu.style.display === '') ? 'block' : 'none';
      });
   }

   // ฟังก์ชันสำหรับเลือกภาษา
   const buttons = document.querySelectorAll('.languageMenu li button');
   buttons.forEach(button => {
      button.addEventListener('click', function() {
         selectLanguage(button);
      });
   });
});

// ฟังก์ชันสำหรับเลือกภาษา
function selectLanguage(button) {
   const buttons = document.querySelectorAll('.languageMenu li button');
   
   // ลบคลาส 'selected' จากทุกปุ่ม
   buttons.forEach(btn => {
      btn.classList.remove('selected');
   });

   // เพิ่มคลาส 'selected' ให้กับปุ่มที่เลือก
   button.classList.add('selected');

   // อัปเดตตำแหน่งของลูกศร
   updateArrowPosition(button);
}

// ฟังก์ชันสำหรับอัปเดตตำแหน่งของลูกศร
function updateArrowPosition(button) {
   const arrow = button.querySelector('::after'); // ใช้ pseudo-element เพื่อจัดการตำแหน่ง
   // ทำให้ลูกศรชี้ไปที่ตัวเลือกที่เลือก
   arrow.style.transform = 'translateX(-50%) rotate(180deg)';
}
