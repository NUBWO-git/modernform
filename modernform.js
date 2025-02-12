//แปลภาษา
document.addEventListener('DOMContentLoaded', function () {
   const translateButton = document.getElementById('translateButton');
   const languageMenu = document.getElementById('languageMenu');

   // ฟังก์ชันตั้งค่าไอคอนในปุ่มเมนูภาษา
   function updateMenuIcons(selectedLang) {
      const buttons = document.querySelectorAll('#languageMenu li button');
      buttons.forEach(button => {
         const buttonLang = button.getAttribute('data-lang');
         const fullText = button.getAttribute('data-full-text');
         if (buttonLang === selectedLang) {
            // เพิ่มไอคอนในปุ่มที่เลือก
            button.innerHTML = `<img src="./img/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText} <span class="material-symbols-outlined">arrow_left</span>`;
         } else {
            // รีเซ็ตปุ่มอื่นๆ ให้ไม่มีไอคอน
            button.innerHTML = `<img src="./img/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText}`;
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
   }

   // ฟังก์ชันเลือกภาษา
   window.selectLanguage = function (lang) {
      // อัปเดตข้อความในปุ่มแปลภาษา
      translateButton.innerHTML = lang;

      // ปิดเมนูภาษา
      languageMenu.style.display = 'none';

      // อัปเดตไอคอนในเมนู
      updateMenuIcons(lang);
   };
});

//การไหลของรูปภาพ หน้าเมนุ
document.addEventListener('DOMContentLoaded', function () {
   let currentIndex = 0;
   const images = document.querySelectorAll('.image-item'); // หาทุก element ที่มีคลาส .image-item
   const totalImages = images.length;

   function slideImages() {
      images.forEach((image, index) => {
         image.style.transform = `translateX(-${currentIndex * 100}%)`; // เลื่อนไปที่รูปที่ currentIndex
      });

      currentIndex = (currentIndex + 1) % totalImages; // เลื่อนไปที่รูปถัดไป
   }

   // เรียกใช้ฟังก์ชันสไลด์ทุกๆ 6 วินาที
   setInterval(slideImages, 6000); // 6000 มิลลิวินาที = 6 วินาที
});

//การไหลของรูปใน Blue Zero
document.addEventListener('DOMContentLoaded', function () {
   let currentIndexBlueZero = 0;
   const slidesBlueZero = document.querySelector('.BlueZero-slides');
   const totalSlidesBlueZero = document.querySelectorAll('.BlueZero-slide').length;

   function slideImagesBlueZero() {
      // คำนวณตำแหน่งที่ต้องเลื่อนไป
      const offset = -currentIndexBlueZero * 100;
      slidesBlueZero.style.transform = `translateX(${offset}%)`;

      // อัพเดต index เพื่อให้เลื่อนไปยังรูปถัดไป
      currentIndexBlueZero = (currentIndexBlueZero + 1) % totalSlidesBlueZero;
   }

   // เรียกใช้งานฟังก์ชัน slideImagesBlueZero ทุกๆ 2 วินาที
   setInterval(slideImagesBlueZero, 2000); // 2000 มิลลิวินาที = 2 วินาที
});

//เชื่อมไปยังหน้าของ Modernform Online Store
document.addEventListener("DOMContentLoaded", function () {
   let storeButton = document.getElementById("storeButton");
   if (storeButton) {
      storeButton.addEventListener("click", function () {
         window.location.href = "Online Store/Modernform Online Store.html";
      });
   }
});