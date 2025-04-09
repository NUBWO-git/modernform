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
   const pagination = document.getElementById("pagination");

   const itemsPerPage = 20; // 20 รูปต่อหน้า
   let currentPage = 1;
   let totalItems = 0;
   let totalPages = 0;
   let currentData = []; // เก็บข้อมูลที่ดึงมา

   // ฟังก์ชันเรียกข้อมูลและอัปเดต UI
   function fetchDataAndUpdate(sortOrder) {
      fetch(`http://localhost/modernform/PET%20COLLECTION/STEELCASE/STEELCASE.php?sort=${sortOrder}`)
         .then(response => response.json())
         .then(data => {
            currentData = data; // เก็บข้อมูลทั้งหมด
            totalItems = data.length; // จำนวนรูปทั้งหมด
            totalPages = Math.floor(totalItems / itemsPerPage); // คำนวณหน้าตามจำนวนรูป

            if (totalItems % itemsPerPage !== 0 && totalItems >= itemsPerPage) {
               totalPages++; // ถ้ามีรูปเหลือที่ไม่ถึง 20 ก็ต้องเพิ่มหน้า
            }

            // ซ่อน Pagination ถ้ารูปยังไม่ถึง 20 รูป
            if (totalItems < itemsPerPage) {
               totalPages = 1;
            }

            gallery.innerHTML = ''; // ล้างข้อมูลเก่า
            renderGallery(currentPage); // แสดงรูปในหน้าปัจจุบัน
            renderPagination(); // แสดง Pagination ถ้ามีมากกว่า 20 รูป
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // ฟังก์ชันแสดงรูปในแต่ละหน้า
   function renderGallery(page) {
      gallery.innerHTML = ""; // ล้างข้อมูลเก่า
      let start = (page - 1) * itemsPerPage;
      let end = start + itemsPerPage;

      if (totalItems < itemsPerPage) {
         end = totalItems; // ถ้ามีรูปไม่ถึง 20 ก็ให้แสดงทั้งหมด
      }

      for (let i = start; i < end && i < totalItems; i++) {
         const image = currentData[i];

         const imgElement = document.createElement("img");
         imgElement.src = image.src;
         imgElement.alt = image.name;
         imgElement.classList.add("gallery-image");

         // ใช้ Flexbox เพื่อให้ Name กับปุ่ม Buy Now อยู่ในบรรทัดเดียวกัน
         const nameContainer = document.createElement("div");
         nameContainer.classList.add("gallery-name-container");

         const nameElement = document.createElement("div");
         nameElement.textContent = image.name;
         nameElement.classList.add("gallery-name");

         // ปุ่ม "Buy Now"
         const buyNowButton = document.createElement("button");
         buyNowButton.classList.add("gallery-button", "buy-now-button");
         buyNowButton.textContent = "Buy Now";

         nameContainer.append(nameElement, buyNowButton);

         const categoryElement = document.createElement("div");
         categoryElement.textContent = image.category;
         categoryElement.classList.add("gallery-category");

         const productItem = document.createElement("div");
         productItem.classList.add("gallery-item");

         productItem.append(imgElement, nameContainer, categoryElement);
         gallery.appendChild(productItem);
      }
   }

   // ฟังก์ชันแสดงปุ่มเปลี่ยนหน้า
   function renderPagination() {
      pagination.innerHTML = ''; // ล้างปุ่มหน้าเก่า

      // ✅ ซ่อน Pagination ถ้ารูปยังไม่ถึง 20
      if (totalItems < itemsPerPage) {
         return;
      }

      // ปุ่ม Previous
      const prevButton = document.createElement("span");
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>';
      prevButton.classList.add("page-prev");
      prevButton.addEventListener("click", function () {
         if (currentPage > 1) {
            currentPage--;
            renderGallery(currentPage);
            renderPagination();
         }
      });
      pagination.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
         let pageLink = document.createElement('span');
         pageLink.textContent = i;
         pageLink.classList.add('page-number');
         if (i === currentPage) pageLink.classList.add('active');

         pageLink.addEventListener('click', function () {
            currentPage = i;
            renderGallery(currentPage);
            renderPagination();
         });

         pagination.appendChild(pageLink);
      }

      // ปุ่ม Next
      const nextButton = document.createElement("span");
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>';
      nextButton.classList.add("page-next");
      nextButton.addEventListener("click", function () {
         if (currentPage < totalPages) {
            currentPage++;
            renderGallery(currentPage);
            renderPagination();
         }
      });
      pagination.appendChild(nextButton);
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
   const defaultTitle = "CUSTOM SOFA"; // ชื่อเมนูหน้าหลัก

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

//แถบเมนูสินค้า
document.addEventListener("DOMContentLoaded", function () {
   const menuToggle = document.getElementById("menu-toggle");
   const menuOptions = document.getElementById("menu-options");
   const selectedOption = document.getElementById("selected-option");
   const menuItems = document.querySelectorAll("#menu-options li");
   const gallery = document.getElementById("gallery");
   const pagination = document.getElementById("pagination");

   const itemsPerPage = 20; // 20 รูปต่อหน้า
   let currentPage = 1;
   let totalItems = 0;
   let totalPages = 0;
   let currentData = [];

   // ฟังก์ชันเรียกข้อมูลและอัปเดต UI
   function fetchDataAndUpdate(sortOrder) {
      fetch(`http://localhost/modernform/PET%20COLLECTION/STEELCASE/STEELCASE.php?sort=${sortOrder}`)
         .then(response => response.json())
         .then(data => {
            currentData = data; // เก็บข้อมูลทั้งหมด
            totalItems = data.length; // จำนวนรูปทั้งหมด
            totalPages = Math.ceil(totalItems / itemsPerPage); // คำนวณจำนวนหน้า

            gallery.innerHTML = ''; // ล้างข้อมูลเก่า
            renderGallery(); // เรียกใช้ฟังก์ชันแสดงรูปในหน้าแรก
            renderPagination(); // สร้างปุ่มเปลี่ยนหน้า
         })
         .catch(error => console.error('Error fetching data:', error));
   }

   // ฟังก์ชันแสดงรูปในแต่ละหน้า
   function renderGallery() {
      gallery.innerHTML = ""; // ล้างข้อมูลเก่า
      let start = (currentPage - 1) * itemsPerPage;
      let end = start + itemsPerPage;

      console.log(`Rendering images from index ${start} to ${end} (Total: ${totalItems})`); // Debugging

      for (let i = start; i < end && i < totalItems; i++) {
         const image = currentData[i]; // ใช้ currentData แทน images

         const imgElement = document.createElement("img");
         imgElement.src = image.src;
         imgElement.alt = image.name;
         imgElement.classList.add("gallery-image");

         // ✅ ใช้ Flexbox เพื่อให้ Name กับปุ่ม Buy Now อยู่ในบรรทัดเดียวกัน
         const nameContainer = document.createElement("div");
         nameContainer.classList.add("gallery-name-container");

         const nameElement = document.createElement("div");
         nameElement.textContent = image.name;
         nameElement.classList.add("gallery-name");

         // ปุ่ม "Buy Now"
         const buyNowButton = document.createElement("button");
         buyNowButton.classList.add("gallery-button", "buy-now-button");
         buyNowButton.textContent = "Buy Now";
         buyNowButton.addEventListener("click", function () {
            // เพิ่มฟังก์ชันการซื้อสินค้า เช่นการเปิดหน้าต่างใหม่หรือทำการไปที่หน้า checkout
            alert(`You clicked Buy Now for: ${image.name}`);
         });

         nameContainer.append(nameElement, buyNowButton); // ✅ จัดเรียงชื่อสินค้า + ปุ่มในบรรทัดเดียวกัน

         const categoryElement = document.createElement("div");
         categoryElement.textContent = image.category;
         categoryElement.classList.add("gallery-category");

         const productItem = document.createElement("div");
         productItem.classList.add("gallery-item");

         productItem.append(imgElement, nameContainer, categoryElement);
         gallery.appendChild(productItem);
      }
   }

   // ฟังก์ชันแสดงปุ่มเปลี่ยนหน้า
   function renderPagination() {
      pagination.innerHTML = ''; // ล้างปุ่มหน้าเก่า
      // ปุ่ม Previous
      const prevButton = document.createElement("span");
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>'; // ไอคอนลูกศรซ้าย
      prevButton.classList.add("page-prev");
      prevButton.addEventListener("click", function () {
         if (currentPage > 1) {
            currentPage--;
            renderGallery();  // เรียกฟังก์ชันเพื่อแสดงสินค้าหรือข้อมูล
            renderPagination();  // เรียกฟังก์ชันเพื่อแสดงปุ่มหน้าที่ใหม่
         }
      });
      pagination.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
         let pageLink = document.createElement('span');  // ใช้ 'span' แทน 'button'
         pageLink.textContent = i;
         pageLink.classList.add('page-number');  // เพิ่ม class 'page-number'
         if (i === currentPage) pageLink.classList.add('active');  // เพิ่ม class 'active' เมื่อเป็นหน้า active

         pageLink.addEventListener('click', function () {
            currentPage = i;
            renderGallery();  // เรียกฟังก์ชันเพื่อแสดงสินค้าหรือข้อมูล
            renderPagination();  // เรียกฟังก์ชันเพื่อแสดงปุ่มหน้าที่ใหม่
         });

         pagination.appendChild(pageLink);  // เพิ่มหน้าเพจลงใน pagination
      }

      // ปุ่ม Next
      const nextButton = document.createElement("span");
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>'; // ไอคอนลูกศรขวา
      nextButton.classList.add("page-next");
      nextButton.addEventListener("click", function () {
         if (currentPage < totalPages) {
            currentPage++;
            renderGallery();  // เรียกฟังก์ชันเพื่อแสดงสินค้าหรือข้อมูล
            renderPagination();  // เรียกฟังก์ชันเพื่อแสดงปุ่มหน้าที่ใหม่
         }
      });
      pagination.appendChild(nextButton);
   }

   // ฟังก์ชันสำหรับเมนู
   menuItems.forEach(item => {
      item.addEventListener("click", function () {
         const sortOption = item.getAttribute("data-value");
         selectedOption.textContent = sortOption;
         fetchDataAndUpdate(sortOption);
         menuToggle.classList.toggle("open");
      });
   });

   // เรียกข้อมูลเริ่มต้น
   fetchDataAndUpdate("ล่าสุด");
});

//หมวดหมู่ของสินค้า
document.addEventListener('DOMContentLoaded', function () {
   const productList = document.getElementById('gallery');
   const mainMenus = document.querySelectorAll('.Main-menu');
   const pagination = document.getElementById("pagination");

   let products = [];
   let filteredProducts = []; // ใช้ตัวแปรนี้เพื่อเก็บสินค้าที่กรอง
   let currentCategory = null;
   let currentPage = 1;
   const itemsPerPage = 20; // จำนวนสินค้าต่อหน้า

   function updateItemCount() {
      const count = filteredProducts.length; // จำนวนสินค้าที่กรองแล้ว
      document.getElementById("itemCount").textContent = count + " รายการ"; // แสดงจำนวนทั้งหมด
   }

   // ฟังก์ชันที่ใช้ในการแสดงสินค้า
   function renderGallery() {
      productList.innerHTML = ''; // ล้างข้อมูลเก่า
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = currentPage * itemsPerPage;
      const productsToDisplay = filteredProducts.slice(startIdx, endIdx);

      // แสดงสินค้า
      productsToDisplay.forEach(product => {
         const imgElement = document.createElement("img");
         imgElement.src = product.src;
         imgElement.alt = product.name;
         imgElement.classList.add("gallery-image");

         const nameContainer = document.createElement("div");
         nameContainer.classList.add("gallery-name-container");

         const nameElement = document.createElement("div");
         nameElement.textContent = product.name;
         nameElement.classList.add("gallery-name");

         const buyNowButton = document.createElement("button");
         buyNowButton.classList.add("gallery-button", "buy-now-button");
         buyNowButton.textContent = "Buy Now";

         nameContainer.append(nameElement, buyNowButton);

         const categoryElement = document.createElement("div");
         categoryElement.textContent = product.category;
         categoryElement.classList.add("gallery-category");

         const productItem = document.createElement("div");
         productItem.classList.add("gallery-item");

         productItem.append(imgElement, nameContainer, categoryElement);
         productList.appendChild(productItem);
      });

      updateItemCount();

      // ถ้าจำนวนสินค้าหลังจากกรองมากกว่า 20 รายการ แสดง pagination
      if (filteredProducts.length > itemsPerPage) {
         renderPagination(filteredProducts.length);
      } else {
         pagination.innerHTML = ''; // ถ้าน้อยกว่า 20 รายการ ไม่แสดง pagination
      }
   }

   // ฟังก์ชันการแบ่งหน้า
   function renderPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / itemsPerPage); // คำนวณจำนวนหน้า
      pagination.innerHTML = '';

      // ปุ่ม Previous
      const prevButton = document.createElement('span');
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>';
      prevButton.classList.add('page-prev');
      prevButton.addEventListener('click', function () {
         if (currentPage > 1) {
            currentPage--;
            renderGallery(); // เรียกใช้งาน renderGallery แทนการ fetch ใหม่
         }
      });
      pagination.appendChild(prevButton);

      // สร้างปุ่มเลขหน้า
      for (let i = 1; i <= totalPages; i++) {
         let pageLink = document.createElement('span');
         pageLink.textContent = i;
         pageLink.classList.add('page-number');
         if (i === currentPage) pageLink.classList.add('active');

         pageLink.addEventListener('click', function () {
            currentPage = i;
            renderGallery(); // เรียกใช้งาน renderGallery แทนการ fetch ใหม่
         });

         pagination.appendChild(pageLink);
      }

      // ปุ่ม Next
      const nextButton = document.createElement('span');
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>';
      nextButton.classList.add('page-next');
      nextButton.addEventListener('click', function () {
         if (currentPage < totalPages) {
            currentPage++;
            renderGallery(); // เรียกใช้งาน renderGallery แทนการ fetch ใหม่
         }
      });
      pagination.appendChild(nextButton);
   }

   // ฟังก์ชันสำหรับดึงข้อมูลสินค้า
   function fetchProducts(category = null) {
      const url = new URL('http://localhost/modernform/PET%20COLLECTION/STEELCASE/STEELCASE.php');
      const params = {};

      if (category) params.category = category;

      Object.keys(params).forEach(key => {
         if (params[key]) url.searchParams.append(key, params[key]);
      });

      console.log('Fetching URL:', url.toString());

      fetch(url)
         .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
         })
         .then(data => {
            products = Array.isArray(data) ? data : [];
            console.log('Fetched products:', products);

            // กรองสินค้าตามหมวดหมู่
            filteredProducts = currentCategory
               ? products.filter(product => product.category === currentCategory)
               : products;

            renderGallery(); // เรียกใช้งาน renderGallery เพื่อแสดงสินค้าที่กรองแล้ว
         })
         .catch(error => console.error('Error fetching products:', error));
   }

   // ฟังก์ชันเมื่อคลิกเมนูหลัก
   mainMenus.forEach(menu => {
      menu.addEventListener('click', function () {
         const category = this.dataset.category || null;

         if (category === currentCategory) {
            currentCategory = null; // รีเซ็ตหมวดหมู่
         } else {
            currentCategory = category; // กำหนดหมวดหมู่ใหม่
         }

         currentPage = 1; // รีเซ็ตหน้าเป็นหน้าแรก
         fetchProducts(currentCategory); // ดึงข้อมูลใหม่ตามหมวดหมู่ที่เลือก
         console.log('Main menu clicked:', category);
      });
   });

   fetchProducts(); // โหลดสินค้าทั้งหมดตอนเริ่มต้น
});

// นับสินค้าที่แสดงบนหน้า HTML
function updateItemCount() {
   let count = document.querySelectorAll("#gallery .gallery-item").length;
   document.getElementById("itemCount").textContent = count + " รายการ";
}

// ตัวนับหน้าเมื่อรูปครบ 20 รูป 
document.addEventListener("DOMContentLoaded", function () {
   const gallery = document.getElementById("gallery");
   const pagination = document.getElementById("pagination");

   const itemsPerPage = 20; // 20 รูปต่อหน้า
   let currentPage = 1;
   let totalItems = 0;
   let totalPages = 0;
   let images = [];

   // ฟังก์ชันดึงข้อมูลจาก API
   async function fetchImages() {
      try {
         console.log("Fetching images...");
         const response = await fetch("http://localhost/modernform/PET%20COLLECTION/STEELCASE/STEELCASE.php");

         if (!response.ok) {
            throw new Error("Failed to fetch data from API");
         }

         images = await response.json();
         console.log("Images received:", images); // Debugging
         totalItems = images.length;
         totalPages = Math.ceil(totalItems / itemsPerPage); // คำนวณจำนวนหน้าจากจำนวนรูปภาพ

         if (totalItems > 0) { // แก้ไขตรงนี้ให้แสดงเมื่อมีรูปภาพ
            currentPage = 1; // รีเซ็ตให้กลับไปที่หน้าแรก
            renderGallery(); // แสดงรูป

            // ตรวจสอบว่าเรามีรูปภาพมากพอที่จะต้องแสดง pagination หรือไม่
            if (totalItems > itemsPerPage) {
               renderPagination(); // สร้างปุ่มเพจ
            } else {
               pagination.innerHTML = ''; // ถ้าไม่มีรูปภาพมากพอ จะไม่แสดง pagination
            }
         } else {
            gallery.innerHTML = "<p>No images available.</p>"; // ถ้าไม่มีรูปภาพ
         }
      } catch (error) {
         console.error("Error fetching images:", error);
         gallery.innerHTML = "<p>Error loading images.</p>";
      }
   }

   function renderGallery() {
      gallery.innerHTML = ""; // ล้างข้อมูลเก่า
      let start = (currentPage - 1) * itemsPerPage;
      let end = start + itemsPerPage;

      console.log(`Rendering images from index ${start} to ${end} (Total: ${totalItems})`); // Debugging

      for (let i = start; i < end && i < totalItems; i++) {
         const image = images[i];

         const imgElement = document.createElement("img");
         imgElement.src = image.src;
         imgElement.alt = image.name;
         imgElement.classList.add("gallery-image");

         const nameContainer = document.createElement("div");
         nameContainer.classList.add("gallery-name-container");

         const nameElement = document.createElement("div");
         nameElement.textContent = image.name;
         nameElement.classList.add("gallery-name");

         const buyNowButton = document.createElement("button");
         buyNowButton.classList.add("gallery-button", "buy-now-button");
         buyNowButton.textContent = "Buy Now";

         nameContainer.append(nameElement, buyNowButton);

         const categoryElement = document.createElement("div");
         categoryElement.textContent = image.category;
         categoryElement.classList.add("gallery-category");

         const productItem = document.createElement("div");
         productItem.classList.add("gallery-item");

         productItem.append(imgElement, nameContainer, categoryElement);
         gallery.appendChild(productItem);
      }
   }

   function renderPagination() {
      pagination.innerHTML = "";

      if (totalPages > 1) {
         const prevButton = document.createElement("span");
         prevButton.innerHTML = '<span class="material-icons">chevron_left</span>';
         prevButton.classList.add("page-prev");
         prevButton.addEventListener("click", function () {
            if (currentPage > 1) {
               currentPage--;
               renderGallery();
               renderPagination();
            }
         });
         pagination.appendChild(prevButton);

         for (let i = 1; i <= totalPages; i++) {
            let pageLink = document.createElement("span");
            pageLink.textContent = i;
            pageLink.classList.add("page-number");
            if (i === currentPage) pageLink.classList.add("active");

            pageLink.addEventListener("click", function () {
               currentPage = i;
               renderGallery();
               renderPagination();
            });

            pagination.appendChild(pageLink);
         }

         const nextButton = document.createElement("span");
         nextButton.innerHTML = '<span class="material-icons">chevron_right</span>';
         nextButton.classList.add("page-next");
         nextButton.addEventListener("click", function () {
            if (currentPage < totalPages) {
               currentPage++;
               renderGallery();
               renderPagination();
            }
         });
         pagination.appendChild(nextButton);

         console.log("Pagination HTML:", pagination.innerHTML); // Debugging
      }
   }

   // ฟังก์ชันสำหรับคลิกซ้ำเพื่อรีเฟรช
   function refreshPage() {
      currentPage = 1;
      fetchImages(); // เรียกให้ดึงข้อมูลใหม่
   }

   const refreshButton = document.getElementById('refreshButton');
   if (refreshButton) {
      refreshButton.addEventListener('click', function () {
         refreshPage(); // เรียกการรีเฟรชข้อมูลเมื่อคลิก
      });
   }

   const menuButtons = document.querySelectorAll('.menu');
   menuButtons.forEach(button => {
      button.addEventListener('click', function () {
         refreshPage(); // เมื่อคลิกที่เมนูจะทำการรีเฟรชหน้า
      });
   });

   fetchImages(); // เรียกฟังก์ชันดึงข้อมูลเริ่มต้น
});


//ลิ้ง URL
document.addEventListener("DOMContentLoaded", function () {
   let elements = document.querySelectorAll("p, #storeButton, #newButton");

   elements.forEach(function (element) {
      element.addEventListener("click", function () {
         let targetUrl = "";
         console.log("Clicked element:", element);  // ตรวจสอบว่า element ที่คลิกคืออะไร

         if (element.tagName === "P") {
            let text = element.textContent.trim();

            switch (text) {
               case "Office":
                  targetUrl = "Online%20Store/Modernform%20Online%20Store.html";
                  break;
               case "Steelcase":
                  targetUrl = "Online%20Store/Steelcase/Steelcase.html";
                  break;
               case "Home":
                  targetUrl = "Online%20Store/Home%20Shop/Home%20Shop.html";
                  break;
               case "Kitchen":
                  targetUrl = "Online%20Store/Kitchen/Kitchen.html";
                  break;
               case "Walk-in closet & Storage":
                  targetUrl = "Online%20Store/Walk/Walk.html";
                  break;
               case "Hardware & Fitting":
                  targetUrl = "Online%20Store/Hardware/Hardware.html";
                  break;
            }
         } else if (element.id === "storeButton") {
            targetUrl = "http://localhost/modernform/PET%20COLLECTION/DESIGN%20AWARDS/DESIGN%20AWARDS.html";
         }

         console.log("Target URL:", targetUrl);  // Debugging

         if (targetUrl) {
            window.location.href = targetUrl;  // ลองดูว่าไปถึงตรงนี้หรือไม่
         }
      });
   });
});
