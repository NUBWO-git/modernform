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
            button.innerHTML = `<img src="./img/National flag/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText} <span class="material-symbols-outlined">arrow_left</span>`;
         } else {
            // รีเซ็ตปุ่มอื่นๆ ให้ไม่มีไอคอน
            button.innerHTML = `<img src="./img/National flag/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText}`;
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

//เมนูใน Products
// ควบคุมการเปิด/ปิดเมนูย่อย
document.addEventListener('DOMContentLoaded', function () {
   const productsBtn = document.getElementById('productsBtn'); // ค้นหาปุ่ม "Products"
   const submenu = document.getElementById('submenu'); // ค้นหาเมนูย่อย

   // ตรวจสอบว่า element มีอยู่หรือไม่
   if (productsBtn && submenu) {
      productsBtn.addEventListener('click', function (event) {
         event.preventDefault(); // ป้องกันการรีเฟรชหน้า
         submenu.classList.toggle('show'); // สลับการแสดงเมนูย่อย
      });
   }
});

//แถบเมนูสินค้า
// การเลือกเมนู
document.addEventListener("DOMContentLoaded", function () {
   const menuToggle = document.getElementById("menu-toggle");
   const menuOptions = document.getElementById("menu-options");
   const selectedOption = document.getElementById("selected-option");
   const menuItems = document.querySelectorAll("#menu-options li");

   // เปิด/ปิดเมนู
   menuToggle.addEventListener("click", function () {
      if (menuOptions.classList.contains("show")) {
         menuOptions.classList.remove("show");
         setTimeout(() => {
            menuOptions.style.display = "none";
         }, 300);
      } else {
         menuOptions.style.display = "block";
         setTimeout(() => {
            menuOptions.classList.add("show");
         }, 10);
      }
   });

   // เมื่อโหลดเพจครั้งแรก, ให้ "ล่าสุด" แสดงสามเหลี่ยม
   const firstMenuItem = document.querySelector('[data-value="ล่าสุด"] .triangle');
   if (firstMenuItem) {
      firstMenuItem.style.display = 'inline-block'; // แสดงสามเหลี่ยมใน "ล่าสุด"
   }

   // เมื่อเลือกเมนู
   menuItems.forEach(item => {
      item.addEventListener("click", function () {
         const value = item.getAttribute("data-value"); // ดึงค่าของเมนูที่เลือก
         selectedOption.textContent = value; // เปลี่ยนข้อความที่แสดงในตัวเลือก

         // ซ่อนสามเหลี่ยมจากทุกเมนู
         document.querySelectorAll('.triangle').forEach(triangle => {
            triangle.style.display = 'none';
         });

         // แสดงสามเหลี่ยมในเมนูที่เลือก
         const triangle = item.querySelector('.triangle');
         if (triangle) {
            triangle.style.display = 'inline-block'; // แสดงสามเหลี่ยม
         }

         // ปิดเมนู
         menuOptions.classList.remove("show");
         setTimeout(() => {
            menuOptions.style.display = "none";
         }, 300);
      });
   });
});

// การเลือกเมนู
document.addEventListener("DOMContentLoaded", function () {
   const menuToggle = document.getElementById("menu-toggle");
   const menuOptions = document.getElementById("menu-options");
   const selectedOption = document.getElementById("selected-option");
   const menuItems = document.querySelectorAll("#menu-options li");

   // เปิด/ปิดเมนู
   menuToggle.addEventListener("click", function () {
      if (menuOptions.classList.contains("show")) {
         menuOptions.classList.remove("show");
         setTimeout(() => {
            menuOptions.style.display = "none";
         }, 300);
      } else {
         menuOptions.style.display = "block";
         setTimeout(() => {
            menuOptions.classList.add("show");
         }, 10);
      }
   });

   // เมื่อโหลดเพจครั้งแรก, ให้ "ล่าสุด" แสดงสามเหลี่ยม
   const firstMenuItem = document.querySelector('[data-value="ล่าสุด"] .triangle');
   if (firstMenuItem) {
      firstMenuItem.style.display = 'inline-block'; // แสดงสามเหลี่ยมใน "ล่าสุด"
   }

   // เมื่อเลือกเมนู
   menuItems.forEach(item => {
      item.addEventListener("click", function () {
         const value = item.getAttribute("data-value"); // ดึงค่าของเมนูที่เลือก
         selectedOption.textContent = value; // เปลี่ยนข้อความที่แสดงในตัวเลือก

         // ซ่อนสามเหลี่ยมจากทุกเมนู
         document.querySelectorAll('.triangle').forEach(triangle => {
            triangle.style.display = 'none';
         });

         // แสดงสามเหลี่ยมในเมนูที่เลือก
         const triangle = item.querySelector('.triangle');
         if (triangle) {
            triangle.style.display = 'inline-block'; // แสดงสามเหลี่ยม
         }

         // ปิดเมนู
         menuOptions.classList.remove("show");
         setTimeout(() => {
            menuOptions.style.display = "none";
         }, 300);
      });
   });
});


// เลือกหมวดเมนูสินค้า
document.addEventListener("DOMContentLoaded", function () {
   initMainMenu();  // เริ่มฟังก์ชันเมนูหลัก
   initSubMenu(".workspace-menu", ".Workspace-submenu");  // เริ่มฟังก์ชันเมนูย่อย
});

let activeMenu = null; // เก็บเมนูที่ถูกเลือกอยู่
let activeSubmenu = null; // เก็บเมนูย่อยที่ถูกเลือกอยู่

// ฟังก์ชันจัดการเมนูหลัก
function initMainMenu() {
   const mainMenuItems = document.querySelectorAll(".Retro-Menu > p");
   mainMenuItems.forEach(item => {
      item.addEventListener("click", function () {
         toggleMainActive(this);  // เมื่อคลิกจะเรียกใช้ฟังก์ชัน toggle
      });
   });
}

// ฟังก์ชันจัดการเมนูย่อย
function initSubMenu(triggerSelector, submenuSelector) {
   const trigger = document.querySelector(triggerSelector);
   const submenu = document.querySelector(submenuSelector);

   if (trigger && submenu) {
      trigger.addEventListener("click", function (event) {
         event.stopPropagation();  // ป้องกันการคลิกซ้อนทับเมนูอื่น ๆ
         toggleMainActive(trigger);  // คลิกที่เมนูหลัก
         toggleSubmenu(submenu);  // คลิกที่เมนูย่อย
      });
   }
}

// ฟังก์ชันเปิด-ปิดเมนูหลัก
function toggleMainActive(menuItem) {
   // ถ้าเมนูเดียวกันถูกคลิกซ้ำจะเอาสีออก
   if (menuItem === activeMenu) {
      menuItem.classList.remove("active");
      activeMenu = null;
   } else {
      // ถ้าเมนูอื่นถูกคลิก ก็จะเอาสีพื้นหลังออกจากเมนูก่อนหน้า
      if (activeMenu) {
         activeMenu.classList.remove("active");
      }
      menuItem.classList.add("active");
      activeMenu = menuItem;
   }
}
