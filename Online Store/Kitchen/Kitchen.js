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
   const defaultTitle = "Kitchen"; // ชื่อเมนูหน้าหลัก

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
   const pagination = document.getElementById("pagination");

   let products = [];
   let currentCategory = null;
   let currentPage = 1;
   const itemsPerPage = 24; // จำนวนสินค้าต่อหน้า

   function updateItemCount(count) {
      document.getElementById("itemCount").textContent = count + " รายการ"; 
   }

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
               <div class="gallery-category">${product.category}</div>
               <div class="gallery-buttons">
                     <button class="gallery-button other-button">Other</button>
                     <button class="gallery-button buy-now-button">Buy Now</button>
               </div>
         `;
         productList.appendChild(productDiv);
      });

      updateItemCount(filteredProducts.length);
      renderPagination(filteredProducts.length);
   }

   function renderPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      pagination.innerHTML = '';

      // เพิ่มเงื่อนไขที่จะแสดง pagination เฉพาะเมื่อสินค้ามากกว่า 24 รายการ
      if (totalItems <= 24) {
         pagination.style.display = 'none'; // ซ่อน pagination ถ้ามีสินค้าน้อยกว่า 25 รายการ
         return;
      } else {
         pagination.style.display = 'flex'; // แสดง pagination ถ้ามีสินค้ามากกว่า 24 รายการ
      }

      const prevButton = document.createElement('span');
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>';
      prevButton.classList.add('page-prev');
      prevButton.addEventListener('click', function () {
         if (currentPage > 1) {
            currentPage--;
            fetchProducts(currentCategory);
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
            fetchProducts(currentCategory);
         });

         pagination.appendChild(pageLink);
      }

      const nextButton = document.createElement('span');
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>';
      nextButton.classList.add('page-next');
      nextButton.addEventListener('click', function () {
         if (currentPage < totalPages) {
            currentPage++;
            fetchProducts(currentCategory);
         }
      });
      pagination.appendChild(nextButton);
   }

   function fetchProducts(category = null) {
      const url = new URL('http://localhost/modernform/Online%20Store/Kitchen/Kitchen.php');
      if (category) {
         url.searchParams.append("category", category);
      }

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

   mainMenus.forEach(menu => {
      menu.addEventListener('click', function () {
         const category = this.dataset.category || null;
         currentCategory = category === currentCategory ? null : category;
         currentPage = 1; 
         fetchProducts(currentCategory);
         console.log('Main menu clicked:', category);
      });
   });

   fetchProducts();
});

// รูปภาพของสินค้า
function loadImages(sortOption) {
   console.log(sortOption);

   fetch(`Kitchen.php?sort=${sortOption}`)
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

document.addEventListener("DOMContentLoaded", function () {
   const gallery = document.getElementById("gallery");
   const pagination = document.getElementById("pagination");

   const itemsPerPage = 24; // 24 รูปต่อหน้า
   let currentPage = 1;
   let totalItems = 0;
   let totalPages = 0;
   let images = [];

   // ฟังก์ชันดึงข้อมูลจาก API
   async function fetchImages() {
      try {
         console.log("Fetching images...");
         const response = await fetch("http://localhost/modernform/Online%20Store/Kitchen/Kitchen.php");
   
         if (!response.ok) {
            throw new Error("Failed to fetch data from API");
         }
   
         images = await response.json();
         console.log("Images received:", images); // Debugging
         totalItems = images.length;
         totalPages = Math.ceil(totalItems / itemsPerPage); // คำนวณจำนวนหน้าจากจำนวนรูปภาพ
   
         if (totalItems > 0) {
            currentPage = 1; // รีเซ็ตให้กลับไปที่หน้าแรกเสมอ
            renderGallery(); // แสดงรูปภาพ
            renderPagination(); // แสดงปุ่มเพจ
         } else {
            gallery.innerHTML = "<p>No images found.</p>"; // ถ้าไม่มีรูป
         }
      } catch (error) {
         console.error("Error fetching images:", error);
         gallery.innerHTML = "<p>Error loading images.</p>";
      }
   }

   // ฟังก์ชันแสดงรูปในแต่ละหน้า
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
   
         gallery.appendChild(productItem);
      }
   }

   // ฟังก์ชันแสดงตัวเลขหน้า
   function renderPagination() {
      pagination.innerHTML = "";
   
      // ถ้าจำนวนรูปภาพน้อยกว่าหรือเท่ากับ 24 รูป
      if (totalItems <= itemsPerPage) {
         // ไม่แสดงปุ่มเพจ
         return;
      }

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

   // ฟังก์ชันสำหรับคลิกซ้ำเพื่อรีเฟรช
   function refreshPage() {
      currentPage = 1; // รีเซ็ตหน้าไปที่หน้าแรก
      fetchImages(); // เรียกให้ดึงข้อมูลใหม่
   }

   // ตั้งเวลาให้ทำงานเมื่อคลิกบนเมนู
   const refreshButton = document.getElementById('refreshButton');
   if (refreshButton) {
      refreshButton.addEventListener('click', function () {
         refreshPage(); // เรียกการรีเฟรชข้อมูลเมื่อคลิก
      });
   }

   // คลิกเมนูเพื่อรีเฟรช
   const menuButtons = document.querySelectorAll('.menu'); // ใช้เมนูที่มีคลาส .menu
   menuButtons.forEach(button => {
      button.addEventListener('click', function () {
         refreshPage(); // เมื่อคลิกที่เมนูจะทำการรีเฟรชหน้า
      });
   });

   fetchImages(); // เรียกฟังก์ชันดึงข้อมูลเริ่มต้น
});

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
