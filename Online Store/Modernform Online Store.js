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
   initMainMenu();
   initSubMenu();
});

function initMainMenu() {
   const mainMenuItems = document.querySelectorAll(".Retro-Menu > p.Main-menu");
   mainMenuItems.forEach(item => {
      item.addEventListener("click", function () {
         toggleMainMenu(item);
      });
   });
}

function initSubMenu() {
   const subMenuItems = document.querySelectorAll(".menu");
   subMenuItems.forEach(item => {
      item.addEventListener("click", function (event) {
         event.stopPropagation();  // ป้องกันเมนูหลักปิดเมื่อกดเมนูย่อย
         toggleSubMenu(item);
      });
   });
}

function toggleMainMenu(clickedItem) {
   const submenu = clickedItem.nextElementSibling;
   const isActive = clickedItem.classList.contains("active");

   // ✅ ปิดเมนูหลักอื่นๆ และเมนูรองทั้งหมดก่อน
   closeAllMainMenus();
   closeAllSubAndSubSubMenus();

   if (!isActive) {
      clickedItem.classList.add("active");  // ✅ ค้างสีพื้นหลัง
      if (submenu && submenu.classList.contains("Main-menu-submenu")) {
         submenu.style.display = "block";  // ✅ แสดงเมนูรอง
      }
   } else {
      clickedItem.classList.remove("active");
      if (submenu && submenu.classList.contains("Main-menu-submenu")) {
         submenu.style.display = "none";  // ✅ ซ่อนเมนูรอง
      }
   }
}

function toggleSubMenu(clickedItem) {
   const submenu = clickedItem.nextElementSibling;
   const isActive = clickedItem.classList.contains("sub-active");

   // ✅ ปิดเมนูรองอื่นๆ ยกเว้นอันที่คลิก
   closeAllSubMenus(clickedItem);

   if (!isActive) {
      clickedItem.classList.add("sub-active");  // ✅ ค้างสีเมนูรอง
      if (submenu && submenu.classList.contains("submenu")) {
         submenu.classList.add("show");  // ✅ แสดงเมนูย่อย
         submenu.style.display = "block";
      }
   } else {
      clickedItem.classList.remove("sub-active");  // ✅ เอาสีออก
      if (submenu && submenu.classList.contains("submenu")) {
         submenu.classList.remove("show");  // ✅ ซ่อนเมนูย่อย
         submenu.style.display = "none";
      }
   }
}

// ✅ ให้สีค้างเมื่อกดเมนูย่อย
document.addEventListener("click", function (event) {
   if (event.target.closest(".submenu p")) {
      const submenuItems = document.querySelectorAll(".submenu p");
      submenuItems.forEach(item => item.classList.remove("active"));
      event.target.classList.add("active"); // ✅ ค้างสีเมนูย่อยที่ถูกคลิก
   }
});

// ฟังก์ชันสำหรับปิดเมนูหลักทั้งหมด
function closeAllMainMenus() {
   const mainMenuItems = document.querySelectorAll(".Retro-Menu > p.Main-menu");
   mainMenuItems.forEach(item => {
      item.classList.remove("active");
      const submenu = item.nextElementSibling;
      if (submenu && submenu.classList.contains("Main-menu-submenu")) {
         submenu.style.display = "none";
      }
   });

   resetAllActiveStates(); // รีเซ็ตสีพื้นหลังของเมนูหลัก
   resetAllSubmenuActiveStates(); // รีเซ็ตสีพื้นหลังของเมนูย่อย
}

// ฟังก์ชันสำหรับปิดเมนูรองทั้งหมด
function closeAllSubMenus(exceptItem) {
   const subMenuItems = document.querySelectorAll(".menu");
   subMenuItems.forEach(item => {
      if (item !== exceptItem) {
         item.classList.remove("sub-active");
         const submenu = item.nextElementSibling;
         if (submenu && submenu.classList.contains("submenu")) {
            submenu.classList.remove("show");
            submenu.style.display = "none";  // ✅ ซ่อนเมนูรองที่เปิดอยู่
         }
      }
   });

   resetAllSubmenuActiveStates(); // รีเซ็ตสีพื้นหลังของเมนูย่อย
}

// รีเซ็ตสีพื้นหลังทั้งหมด (เมนูหลัก + เมนูย่อย)
function resetAllActiveStates() {
   document.querySelectorAll(".active, .sub-active").forEach(item => {
      item.classList.remove("active", "sub-active");
   });
}

// รีเซ็ตสีพื้นหลังของเมนูย่อยทั้งหมด
function resetAllSubmenuActiveStates() {
   document.querySelectorAll(".submenu p").forEach(item => {
      item.classList.remove("active"); // ลบ active ออกจากเมนูย่อย
   });
}

// ปิดเมนูหลักทั้งหมด
function closeAllMainMenus() {
   document.querySelectorAll(".Retro-Menu > p.Main-menu").forEach(item => {
      item.classList.remove("active");
      const submenu = item.nextElementSibling;
      if (submenu && submenu.classList.contains("Main-menu-submenu")) {
         submenu.style.display = "none";
      }
   });

   resetAllActiveStates(); // รีเซ็ตสีพื้นหลังของเมนูหลัก
   resetAllSubmenuActiveStates(); // รีเซ็ตสีพื้นหลังของเมนูย่อย
}

// ปิดเมนูรองทั้งหมด
function closeAllSubAndSubSubMenus() {
   document.querySelectorAll(".menu").forEach(item => {
      item.classList.remove("sub-active"); // ปิดเมนูรอง
   });

   document.querySelectorAll(".submenu").forEach(submenu => {
      submenu.classList.remove("show"); // ปิดเมนูย่อย
      submenu.style.display = "none";
   });

   document.querySelectorAll(".submenu p").forEach(item => {
      item.classList.remove("active"); // รีเซ็ตสีเมนูย่อย
   });
}

document.addEventListener("DOMContentLoaded", function () {
   initSubSubMenu();  // แค่แก้ปัญหาเมนูย่อย
});

function initSubSubMenu() {
   document.querySelectorAll(".submenu p").forEach(item => {
      item.addEventListener("click", function (event) {
         event.stopPropagation();  // ป้องกันปิดเมนูหลัก

         if (item.classList.contains("active")) {
            item.classList.remove("active"); // ✅ กดซ้ำสีพื้นหลังจะหายไป
         } else {
            closeAllSubSubMenus(); // ✅ ลบ active ออกจากเมนูย่อยอื่น
            item.classList.add("active"); // ✅ ค้างสีเมนูย่อยที่ถูกคลิก
         }
      });
   });
}

function closeAllSubSubMenus() {
   document.querySelectorAll(".submenu p").forEach(item => {
      item.classList.remove("active"); // ✅ ลบสีพื้นหลังของเมนูย่อยทั้งหมด
   });
}

document.addEventListener("DOMContentLoaded", function () {
   updateCategories();
   loadImages(); // โหลดรูปภาพเมื่อหน้าโหลดเสร็จ
   document.getElementById("category").addEventListener("change", updateSubCategories);
   document.getElementById("subCategory").addEventListener("change", updateSubSubCategories);
});

// รูปภาพของสินค้า
function loadImages() {
   fetch('Modernform Online Store.php') // ตรวจสอบให้แน่ใจว่า URL นี้ถูกต้อง
      .then(response => {
         if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
         }
         return response.json();
      })
      .then(images => {
         const gallery = document.getElementById("gallery");
         gallery.innerHTML = ""; // เคลียร์ข้อมูลเก่า

         if (images.length === 0) {
            gallery.innerHTML = "<p>ไม่พบรูปภาพ</p>"; // แสดงข้อความเมื่อไม่มีรูปภาพ
            return;
         }

         images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.src; 
            imgElement.alt = image.name; 
            imgElement.classList.add("gallery-image");

            const nameElement = document.createElement("div");
            nameElement.textContent = `ชื่อ: ${image.name}`;

            const categoryElement = document.createElement("div");
            categoryElement.textContent = `หมวดหมู่: ${image.category}`;

            gallery.append(imgElement, nameElement, categoryElement);
         });
      })
      .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดรูปภาพ:", error));
}