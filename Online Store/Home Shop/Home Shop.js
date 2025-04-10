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
            button.innerHTML = `<img src="./img/Products/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText} <span class="material-symbols-outlined">arrow_left</span>`;
         } else {
            // รีเซ็ตปุ่มอื่นๆ ให้ไม่มีไอคอน
            button.innerHTML = `<img src="./img/Products/${buttonLang}.png" alt="${buttonLang} Icon" class="icon"> ${fullText}`;
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
   const defaultTitle = "Home"; // ชื่อเมนูหน้าหลัก

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

//หมวดหมู่ของสินค้า
document.addEventListener('DOMContentLoaded', function () {
   const productList = document.getElementById('gallery');
   const mainMenus = document.querySelectorAll('.Main-menu');
   const subMenus = document.querySelectorAll('.menu');
   const subSubMenus = document.querySelectorAll('.submenu p');
   const pagination = document.getElementById("pagination");

   let products = [];
   let currentCategory = null;
   let currentSubCategory = null;
   let currentSubSubCategory = null;
   let currentPage = 1;
   const itemsPerPage = 24; // จำนวนสินค้าต่อหน้า

   function updateItemCount() {
      const count = products.length; // จำนวนสินค้าทั้งหมดที่ดึงมา
      document.getElementById("itemCount").textContent = count + " รายการ"; // แสดงจำนวนทั้งหมด
   }

   // ฟังก์ชันที่ใช้ในการแสดงสินค้า
   function displayProducts(filteredProducts) {
      productList.innerHTML = '';
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = currentPage * itemsPerPage;
      const productsToDisplay = filteredProducts.slice(startIdx, endIdx);

      productsToDisplay.forEach(product => {
         const productDiv = document.createElement('div');
         productDiv.classList.add('gallery-item');
         productDiv.innerHTML = `
            <img src="${product.src}" alt="${product.name}" class="gallery-image">
            <div class="gallery-name">${product.name}</div>
            <div class="gallery-category">${product.main_menu}</div>
            <div class="gallery-buttons">
                  <button class="gallery-button other-button">Other</button>
                  <button class="gallery-button buy-now-button">Buy Now</button>
            </div>
      `;
         productList.appendChild(productDiv);
      });

      updateItemCount();

      // เช็คจำนวนสินค้าก่อนที่จะเรียกใช้ renderPagination
      if (filteredProducts.length > itemsPerPage) {
         renderPagination(filteredProducts.length); // เรียกใช้การแสดงหน้าหลังแสดงสินค้า
      } else {
         pagination.innerHTML = ''; // ถ้ามีน้อยกว่าหรือเท่ากับ 24 จะซ่อน pagination
      }
   }


   // ฟังก์ชันการแบ่งหน้า
   function renderPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / itemsPerPage); // คำนวณจำนวนหน้า
      pagination.innerHTML = '';

      // ปุ่ม Previous
      const prevButton = document.createElement('span');
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>'; // ไอคอนลูกศรซ้าย
      prevButton.classList.add('page-prev');
      prevButton.addEventListener('click', function () {
         if (currentPage > 1) {
            currentPage--;
            fetchProducts(currentCategory, currentSubCategory, currentSubSubCategory);
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
            fetchProducts(currentCategory, currentSubCategory, currentSubSubCategory);
         });

         pagination.appendChild(pageLink);
      }

      // ปุ่ม Next
      const nextButton = document.createElement('span');
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>'; // ไอคอนลูกศรขวา
      nextButton.classList.add('page-next');
      nextButton.addEventListener('click', function () {
         if (currentPage < totalPages) {
            currentPage++;
            fetchProducts(currentCategory, currentSubCategory, currentSubSubCategory);
         }
      });
      pagination.appendChild(nextButton);
   }

   // ฟังก์ชันสำหรับดึงข้อมูลสินค้า
   function fetchProducts(main_menu = null, sub_menu = null, sub_sub_menu = null) {
      const url = new URL('http://localhost/modernform/Online%20Store/Home%20Shop/Home%20Shop.php');
      const params = {};

      if (main_menu) params.main_menu = main_menu;
      if (sub_menu) params.sub_menu = sub_menu;
      if (sub_sub_menu) params.sub_sub_menu = sub_sub_menu;

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
            displayProducts(products);
         })
         .catch(error => console.error('Error fetching products:', error));
   }

   // ฟังก์ชันเมื่อคลิกเมนูหลัก
   mainMenus.forEach(menu => {
      menu.addEventListener('click', function () {
         const category = this.dataset.category || null;

         if (category === currentCategory) {
            currentCategory = null;
            currentSubCategory = null;
            currentSubSubCategory = null;
         } else {
            currentCategory = category;
            currentSubCategory = null;
            currentSubSubCategory = null;
         }

         currentPage = 1; // รีเซ็ตหน้าเป็นหน้าแรก
         fetchProducts(currentCategory);
         console.log('Main menu clicked:', category);
      });
   });

   // ฟังก์ชันเมื่อคลิกเมนูย่อย
   subMenus.forEach(menu => {
      menu.addEventListener('click', function () {
         const subCategory = this.dataset.subcategory || null;

         if (subCategory === currentSubCategory) {
            currentSubCategory = null;
            currentSubSubCategory = null;
         } else {
            currentSubCategory = subCategory;
            currentSubSubCategory = null;
         }

         currentPage = 1; // รีเซ็ตหน้าเป็นหน้าแรก
         fetchProducts(currentCategory, currentSubCategory);
         console.log('Sub menu clicked:', subCategory);
      });
   });

   // ฟังก์ชันเมื่อคลิกเมนูย่อยของหมวดหมู่ย่อย
   subSubMenus.forEach(menu => {
      menu.addEventListener('click', function () {
         const subSubCategory = this.dataset.subsub || null;

         if (subSubCategory === currentSubSubCategory) {
            currentSubSubCategory = null;
         } else {
            currentSubSubCategory = subSubCategory;
         }

         currentPage = 1; // รีเซ็ตหน้าเป็นหน้าแรก
         fetchProducts(currentCategory, currentSubCategory, currentSubSubCategory);
         console.log('Sub-sub menu clicked:', subSubCategory);
      });
   });

   fetchProducts(); // โหลดสินค้าทั้งหมดตอนเริ่มต้น
});


// รูปภาพของสินค้า
function loadImages(sortOption) {
   console.log(sortOption);

   fetch(`./Home Shop.php?sort=${sortOption}`)
      .then(response => {
         if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
         }
         return response.json();
      })
      .then(images => {
         const imageContainer = document.getElementById("image-container");
         imageContainer.innerHTML = ""; // ล้างข้อมูลก่อนเพิ่มใหม่

         if (images.length === 0) {
            imageContainer.innerHTML = "<p>ไม่พบรูปภาพ</p>";
            return;
         }

         // แสดงผลสินค้าบนหน้าเว็บ
         images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.src;
            imgElement.alt = image.name;
            imgElement.classList.add("gallery-image");

            const nameElement = document.createElement("div");
            nameElement.textContent = image.name;
            nameElement.classList.add("gallery-name");

            const categoryElement = document.createElement("div");
            categoryElement.textContent = image.category;
            categoryElement.classList.add("gallery-category");

            const productItem = document.createElement("div");
            productItem.classList.add("gallery-item");
            productItem.append(imgElement, nameElement, categoryElement);

            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("gallery-buttons");

            const otherButton = document.createElement("button");
            otherButton.classList.add("gallery-button", "other-button");
            otherButton.textContent = "Other";

            const buyNowButton = document.createElement("button");
            buyNowButton.classList.add("gallery-button", "buy-now-button");
            buyNowButton.textContent = "Buy Now";

            buttonsContainer.append(otherButton, buyNowButton);
            productItem.appendChild(buttonsContainer);

            // **เปลี่ยนจาก gallery เป็น imageContainer**
            imageContainer.appendChild(productItem);
         });

         updateItemCount();
      })
      .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดรูปภาพ:", error));
}

// นับสินค้าที่แสดงบนหน้า HTML
function updateItemCount() {
   let count = document.querySelectorAll("#gallery .gallery-item").length;
   document.getElementById("itemCount").textContent = count + " รายการ";
}

// ตัวนับหน้าเมื่อรูปครบ 24 รูป 
async function fetchImages() {
   try {
      console.log("Fetching images...");
      const response = await fetch("http://localhost/modernform/Online%20Store/Home%20Shop/Home%20Shop.php");

      if (!response.ok) {
         throw new Error("Failed to fetch data from API");
      }

      images = await response.json();
      console.log("Images received:", images); // Debugging
      totalItems = images.length;

      // ถ้าจำนวนน้อยกว่า 24 รูป ไม่แสดง pagination
      if (totalItems <= 24) {
         pagination.innerHTML = ""; // ลบ pagination ออก
      } else {
         // ถ้ามีมากกว่า 24 รูป คำนวณจำนวนหน้า
         totalPages = Math.ceil(totalItems / itemsPerPage);
         renderPagination(); // สร้าง pagination
      }

      renderGallery(); // แสดงรูปภาพ
   } catch (error) {
      console.error("Error fetching images:", error);
      gallery.innerHTML = "<p>Error loading images.</p>";
   }
}

function renderPagination() {
   pagination.innerHTML = ""; // ล้างข้อมูล pagination เก่า

   // ปุ่ม Previous
   const prevButton = document.createElement("span");
   prevButton.innerHTML = '<span class="material-icons">chevron_left</span>'; // ไอคอนลูกศรซ้าย
   prevButton.classList.add("page-prev");
   prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
         currentPage--;
         renderGallery();
         renderPagination();
      }
   });
   pagination.appendChild(prevButton);

   // ปุ่มหน้าที่
   for (let i = 1; i <= totalPages; i++) {
      let pageLink = document.createElement("span");
      pageLink.textContent = i;
      pageLink.classList.add("page-number");
      if (i === currentPage) pageLink.classList.add("active");

      pageLink.addEventListener("click", function () {
         currentPage = i; // เปลี่ยนหน้า
         renderGallery();
         renderPagination();
      });

      pagination.appendChild(pageLink);
   }

   // ปุ่ม Next
   const nextButton = document.createElement("span");
   nextButton.innerHTML = '<span class="material-icons">chevron_right</span>'; // ไอคอนลูกศรขวา
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


//ลิ้ง URL
document.addEventListener('DOMContentLoaded', function () {
   const pElements = document.querySelectorAll('.Allcontact-Box-text p');

   pElements.forEach(function(p) {
      p.addEventListener('click', function () {
         const currentURL = window.location.href;
         let targetUrl = "";

         switch (p.textContent.trim()) {
            case "Office":
               targetUrl = "http://localhost/modernform/Online%20Store/Modernform%20Online%20Store.html";
               break;
            case "Steelcase":
               targetUrl = "http://localhost/modernform/Online%20Store/Steelcase/Steelcase.html";
               if (currentURL === targetUrl) {
                  location.reload();
                  return;
               }
               break;
            case "Home":
               targetUrl = "http://localhost/modernform/Online%20Store/Home%20Shop/Home%20Shop.html";
               break;
            case "Kitchen":
               targetUrl = "http://localhost/modernform/Online%20Store/Kitchen/Kitchen.html";
               break;
            case "Walk-in Closet & Storage":
               targetUrl = "http://localhost/modernform/Online%20Store/Walk/Walk.html";
               break;
            case "Hardware & Fitting":
               targetUrl = "http://localhost/modernform/Online%20Store/Hardware/Hardware.html";
               break;
         }

         if (targetUrl) {
            console.log("Navigating to:", targetUrl);
            window.location.href = targetUrl;
         }
      });
   });
});
