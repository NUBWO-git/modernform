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
document.addEventListener("DOMContentLoaded", function () {
   const menuToggle = document.getElementById("menu-toggle");
   const menuOptions = document.getElementById("menu-options");
   const selectedOption = document.getElementById("selected-option");
   const menuItems = document.querySelectorAll("#menu-options li");
   const gallery = document.getElementById("gallery");

   // ฟังก์ชันเรียกข้อมูลและอัปเดต UI
   function fetchDataAndUpdate(sortOrder) {
      fetch(`http://localhost/modernform/Online%20Store/Modernform%20Online%20Store.php?sort=${sortOrder}`)
         .then(response => response.json())
         .then(data => {
            gallery.innerHTML = ''; // ล้างข้อมูลเก่า
            data.forEach(item => {
               const imgElement = document.createElement("img");
               imgElement.src = item.src;
               imgElement.alt = item.name;
               imgElement.classList.add("gallery-image");

               const nameElement = document.createElement("div");
               nameElement.textContent = item.name;
               nameElement.classList.add("gallery-name");

               const categoryElement = document.createElement("div");
               categoryElement.textContent = item.category;
               categoryElement.classList.add("gallery-category");

               // สร้าง container ของสินค้า
               const productItem = document.createElement("div");
               productItem.classList.add("gallery-item");
               productItem.append(imgElement, nameElement, categoryElement);

               // สร้างปุ่มสำหรับสินค้า
               const buttonsContainer = document.createElement("div");
               buttonsContainer.classList.add("gallery-buttons");

               // ปุ่ม Other
               const otherButton = document.createElement("button");
               otherButton.classList.add("gallery-button", "other-button");
               otherButton.textContent = "Other";

               // ปุ่ม Buy Now
               const buyNowButton = document.createElement("button");
               buyNowButton.classList.add("gallery-button", "buy-now-button");
               buyNowButton.textContent = "Buy Now";

               // เพิ่มปุ่มลงใน container
               buttonsContainer.append(otherButton, buyNowButton);

               // เพิ่มปุ่มลงใน product item
               productItem.append(buttonsContainer);

               // เพิ่ม product item ไปยัง gallery
               gallery.appendChild(productItem);
            });
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // เปิด/ปิดเมนู
   menuToggle.addEventListener("click", function () {
      if (menuOptions.classList.contains("show")) {
         menuOptions.classList.remove("show");
         setTimeout(() => (menuOptions.style.display = "none"), 300);
      } else {
         menuOptions.style.display = "block";
         setTimeout(() => menuOptions.classList.add("show"), 10);
      }
   });

   // กำหนดค่าเริ่มต้น "ล่าสุด"
   const firstMenuItem = document.querySelector('[data-value="ล่าสุด"] .triangle');
   if (firstMenuItem) firstMenuItem.style.display = 'inline-block';

   // จัดการคลิกเมนู
   menuItems.forEach(item => {
      item.addEventListener("click", function () {
         const value = item.getAttribute("data-value");
         selectedOption.textContent = value;

         // ซ่อนสามเหลี่ยมจากทุกเมนู
         document.querySelectorAll('.triangle').forEach(triangle => (triangle.style.display = 'none'));

         // แสดงสามเหลี่ยมในเมนูที่เลือก
         const triangle = item.querySelector('.triangle');
         if (triangle) triangle.style.display = 'inline-block';

         // ปิดเมนู
         menuOptions.classList.remove("show");
         setTimeout(() => (menuOptions.style.display = "none"), 300);

         // เรียก API ตามค่าที่เลือก
         if (value === "ล่าสุด") {
            fetchDataAndUpdate("ล่าสุด");
         } else if (value === "ตัวอักษร") {
            fetchDataAndUpdate("ตัวอักษร");
         }
      });
   });

   // โหลดข้อมูลเริ่มต้น
   fetchDataAndUpdate("ล่าสุด");
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

// ชื่อเมื่อกดเมนู
document.addEventListener("DOMContentLoaded", function () {
   const mainMenus = document.querySelectorAll(".Main-menu");
   const officeTitle = document.querySelector(".OFFICE-ONE h2");
   const defaultTitle = "OFFICE"; // ชื่อเมนูหน้าหลัก

   mainMenus.forEach(menu => {
      menu.addEventListener("click", function () {
         // ดึงเฉพาะชื่อเมนู ไม่รวมไอคอน
         const textOnly = menu.childNodes[0].nodeValue.trim();
         // ตรวจสอบว่าเมนูที่คลิกคือเมนูที่ถูกเลือกอยู่แล้วหรือไม่
         if (officeTitle.textContent === textOnly.toUpperCase()) {
            // ถ้าคลิกเมนูเดียวกันอีกครั้ง ให้รีเซ็ตเป็น "OFFICE"
            officeTitle.textContent = defaultTitle;
         } else {
            // อัปเดตชื่อในแถบข้างบน
            officeTitle.textContent = textOnly.toUpperCase();
         }
      });
   });
});

// รูปภาพของสินค้า
document.addEventListener("DOMContentLoaded", function () {
   loadImages("ล่าสุด"); // ส่งค่าเริ่มต้นไปให้กับ sortOption เช่น 'ล่าสุด'
});

function loadImages(sortOption) {
   console.log(sortOption); // ตรวจสอบว่า sortOption ถูกต้องหรือไม่

   fetch(`Modernform Online Store.php?sort=${sortOption}`)
      .then(response => {
         if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
         }
         return response.json();
      })
      .then(images => {
         const gallery = document.getElementById("gallery");
         gallery.innerHTML = ""; // ลบสินค้าก่อนที่จะเพิ่มใหม่

         if (images.length === 0) {
            gallery.innerHTML = "<p>ไม่พบรูปภาพ</p>";
            return;
         }

         // แสดงผลสินค้าบนหน้าเว็บ
         images.forEach(image => {
            // รูปภาพสินค้า
            const imgElement = document.createElement("img");
            imgElement.src = image.src;
            imgElement.alt = image.name;
            imgElement.classList.add("gallery-image");

            // ชื่อสินค้า
            const nameElement = document.createElement("div");
            nameElement.textContent = image.name;
            nameElement.classList.add("gallery-name");

            // หมวดหมู่สินค้า
            const categoryElement = document.createElement("div");
            categoryElement.textContent = image.category;
            categoryElement.classList.add("gallery-category");

            // สร้าง container ของสินค้า
            const productItem = document.createElement("div");
            productItem.classList.add("gallery-item");
            productItem.append(imgElement, nameElement, categoryElement);

            // สร้างปุ่มสำหรับสินค้า
            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("gallery-buttons");

            // ปุ่ม Other
            const otherButton = document.createElement("button");
            otherButton.classList.add("gallery-button", "other-button");
            otherButton.textContent = "Other";

            // ปุ่ม Buy Now
            const buyNowButton = document.createElement("button");
            buyNowButton.classList.add("gallery-button", "buy-now-button");
            buyNowButton.textContent = "Buy Now";

            // เพิ่มปุ่มเข้าไปใน container
            buttonsContainer.append(otherButton, buyNowButton);
            productItem.appendChild(buttonsContainer);

            // เพิ่มสินค้าเข้าไปในแกลเลอรี
            gallery.appendChild(productItem);
         });

         updateItemCount();
      })
      .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดรูปภาพ:", error));
}

// นับสินค้าที่แสดงบนหน้า html
function updateItemCount() {
   // ใช้ .gallery-item แทน .product-item เนื่องจากสินค้าทุกตัวอยู่ใน .gallery-item
   let count = document.querySelectorAll("#gallery .gallery-item").length;
   document.getElementById("itemCount").textContent = count + " รายการ";
}

