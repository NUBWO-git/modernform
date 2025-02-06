<?php
session_start(); // เริ่มต้น session เพื่อเก็บข้อมูลภาษา

// ตรวจสอบว่ามีการเลือกภาษาใหม่หรือไม่
if (isset($_POST['language'])) {
   $_SESSION['language'] = $_POST['language']; // เก็บภาษาที่เลือกใน session
   // แสดงข้อความแจ้งเตือน
   echo "<p style='color: green;'>Language has been updated to " . $_POST['language'] . "</p>";
} elseif (!isset($_SESSION['language'])) {
   $_SESSION['language'] = 'en'; // กำหนดค่าเริ่มต้นเป็นภาษาอังกฤษ
}

// ใช้ภาษาที่เก็บใน session
$language = $_SESSION['language'];
?>

<!DOCTYPE html>
<html lang="th">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Modernform Online Store</title>
   <link rel="stylesheet" href="Modernform Online Store.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Material+Icons&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<script src="./Modernform Online Store.js"></script>

<body>
   <!-- zone แถบเมนู -->
   <nav class="navbar">
      <div class="logo-menu">
         <div class="logo">
            <img src="./img/Logo/Logo 2.png" alt="Logo">
         </div>
         <ul class="nav-links">
            <li>
               <a href="#" id="productsBtn">Products</a>
               <!-- เมนูย่อยที่ถูกซ่อนไว้ -->
               <ul class="products-submenu" id="submenu">
                  <div class="products-container">
                     <!-- Office -->
                     <div class="product-item">
                        <img src="./img/Products/office.png">
                        <div class="product-text">
                           <h2>Office</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Gaming</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Workspace</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Executive</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Meeting & Conference</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Lounge area</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Collaboration space</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Storage</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Itoki</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Workplace Planning</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Solution</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Modernform x PDM</p>
                           </div>
                        </div>
                     </div>

                     <!-- Steelcase -->
                     <div class="product-item">
                        <img src="./img/Products/Steelcase.png">
                        <div class="product-text">
                           <h2>STEELCASE</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Ergonomic chair</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Adjustable desk</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Working accessories</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Worklounge</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Occasional chairs</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Storage</p>
                           </div>
                        </div>
                     </div>

                     <!-- Home -->
                     <div class="product-item">
                        <img src="./img/Products/Home.png">
                        <div class="product-text">
                           <h2>Home</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Living room</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Dining room</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Bedroom</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Series</p>
                           </div>
                        </div>
                     </div>

                     <!-- Kitchen -->
                     <div class="product-item">
                        <img src="./img/Products/KITCHEN .png">
                        <div class="product-text">
                           <h2>KITCHEN</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Kitchens</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Kitchen Accessories</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Barstool</p>
                           </div>
                        </div>
                     </div>

                     <!-- Walk-in Closet & Storage -->
                     <div class="product-item">
                        <img src="./img/Products/WALK-IN CLOSET & STORAGE.png">
                        <div class="product-text">
                           <h2>WALK-IN CLOSET & STORAGE</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Bookshelf & Multimedia</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Wall decoration</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Walk-in closet</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Wardrobe</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Partition & Sliding Door</p>
                           </div>
                        </div>
                     </div>

                     <!-- Hardware & Fitting -->
                     <div class="product-item">
                        <img src="./img/Products/HARDWARE & FITTING .png">
                        <div class="product-text">
                           <h2>HARDWARE & FITTING</h2>
                           <div class="product-details">
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Furniture Fitting</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Architectural Hardware</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Surfacing and Flooring Material</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Fire-rated & Decorative Doors</p>
                              <p><i class="fa-solid fa-chevron-right arrow-icon"></i> Elevator Decoration</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </ul>
            </li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">Project Reference</a></li>
            <li><a href="#">E-Catalogue</a></li>
            <li><a href="#">Export</a></li>
            <li><a href="#">Online Store</a></li>
         </ul>
      </div>
      <div class="language-and-icons">
         <button id="translateButton">En</button>
         <ul id="languageMenu" class="languageMenu" style="display: none;">
            <li>
               <button onclick="selectLanguage('Th')" data-lang="Th" data-full-text="Th - ภาษาไทย">
                  <img src="./img/National flag/Th.png" alt="Thai Icon" class="icon"> Th - ภาษาไทย
               </button>
            </li>
            <li>
               <button onclick="selectLanguage('En')" data-lang="En" data-full-text="En - English">
                  <img src="./img/National flag/En.png" alt="English Icon" class="icon"> En - English
               </button>
            </li>
         </ul>

         <!-- ไอคอนค้นหาและ GPS -->
         <div class="search-icon">
            <span class="material-symbols-outlined">search</span>
         </div>
         <div class="gps-icon">
            <span class="material-symbols-outlined">location_on</span>
         </div>
      </div>
   </nav>

   <!-- เมนูและระบบอื่นๆ -->
   <div class="OFFICE-TWE">
      <img src="./img/menu/office_menu.jpeg">
   </div>
   <div class="OFFICE-ONE">
      <h2>OFFICE</h2>
   </div>

   <!-- ข้อความเรื่มต้น -->
   <div class="message-one">
      <p>เพราะงานที่ดี เกิดจากการได้อยู่ในสภาพแวดล้อมที่ดีและเกิดจากความสุขของพนักงาน เราจึงมุ่งมั่นที่จะสร้างสรรค์บรรยากาศ ที่เต็มเปี่ยมด้วยสินค้านวัตกรรมที่หลากหลาย ตอบโจทย์ทุกรูปแบบการทำงานอย่างแท้จริง</p>
   </div>

   <!-- เมนูสินค้า -->
   <div class="office-menu">
      <!-- พวกเรียงตาม: -->
      <p id="menu-toggle">
         เรียงตาม: <span id="selected-option">ล่าสุด</span>
         <span class="material-icons" id="toggle-icon">keyboard_arrow_down</span>
      </p>

      <!-- เมนูอยู่ด้านล่างของข้อความ "เรียงตาม: ล่าสุด" -->
      <ul id="menu-options" style="display: none;">
         <li data-value="ล่าสุด">
            <span class="material-icons">update</span> ล่าสุด
            <span class="triangle" style="display: none;"></span>
         </li>
         <li data-value="ตามตัวอักษร">
            <span class="text-icon">Aa</span> ตามตัวอักษร
            <span class="triangle" style="display: none;"></span>
         </li>
      </ul>

      <!-- แถวเมนูออฟฟิศ -->
      <div class="character">
         <h2>office</h2>
         <p>0000 รายการ</p>
      </div>
      <!-- เมนูย้อย -->
      <div class="Retro-Menu">
         <p>Gaming</p>
         <p class="workspace-menu">Workspace <span class="material-icons">keyboard_arrow_down</span></p>
         <div class="Workspace-submenu">
            <p>Desk</p>
            <p>Chair</p>
            <p>Panel</p>
         </div>
         <p>Executive<span class="material-icons">keyboard_arrow_down</span></p>
         <p>Meeting & Conference<span class="material-icons">keyboard_arrow_down</span></p>
         <p>Lounge area<span class="material-icons">keyboard_arrow_down</span></p>
         <p>Collaboration space<span class="material-icons">keyboard_arrow_down</span></p>
         <p>Storage<span class="material-icons">keyboard_arrow_down</span></p>
         <p>Itoki</p>
         <p>Workplace Planning Solution</p>
         <p>Modernform x PDM</p>
      </div>
   </div>

   <!-- แถบ Store Location & Contact Us & Support -->
   <div class="Setup">
      <!-- Store Location -->
      <div class="contact-item">
         <div class="circle"></div>
         <img src="./img/Icon-Official/location.png" alt="Location Icon">
         <h2>Store Location</h2>
         <p>Locate the nearest Modernform store.</p>
      </div>

      <!-- Support -->
      <div class="contact-item">
         <div class="circle"></div>
         <img src="./img/Icon-Official/phone-call.png" alt="Phone Icon">
         <h2>Support</h2>
         <p>Call center 0 2094 9999</p>
      </div>
   </div>

   <!-- ไอคอนช่องทางติดต่อออนไลน์-->
   <div class="online-contact">
      <!-- ไอคอน Facebook -->
      <a href="https://www.facebook.com/yourpage" target="_blank">
         <img src="./img/Online icons/Facebook.png" alt="Facebook">
         <img src="./img/Online icons/facebook_color.png">
      </a>

      <!-- ไอคอน Instagram -->
      <a href="https://www.instagram.com/yourpage" target="_blank">
         <img src="./img/Online icons/Instagram.png" alt="Instagram">
         <img src="./img/Online icons/Instagram_color.png">
      </a>

      <!-- ไอคอน YouTube -->
      <a href="https://www.youtube.com/yourpage" target="_blank">
         <img src="./img/Online icons/YouTube.png" alt="YouTube">
         <img src="./img/Online icons/YouTube_color.png">
      </a>

      <!-- ไอคอน Line -->
      <a href="https://line.me/yourpage" target="_blank">
         <img src="./img/Online icons/Line.png" alt="Line">
         <img src="./img/Online icons/Line_color.png">
      </a>

      <!-- ไอคอน Pinterest -->
      <a href="https://www.pinterest.com/yourpage" target="_blank">
         <img src="./img/Online icons/Pinterest.png" alt="Pinterest">
         <img src="./img/Online icons/Pinterest_color.png">
      </a>

      <!-- ไอคอน TikTok -->
      <a href="https://www.tiktok.com/@yourpage" target="_blank">
         <img src="./img/Online icons/TikTok.png" alt="TikTok">
         <img src="./img/Online icons/TikTok _color.png">
      </a>

      <!-- ไอคอน X (Twitter) -->
      <a href="https://twitter.com/yourpage" target="_blank">
         <img src="./img/Online icons/X (Twitter).png" alt="X (Twitter)">
         <img src="./img/Online icons/X (Twitter)_color.png">
      </a>

      <!-- ไอคอน Threads -->
      <a href="https://www.threads.net/yourpage" target="_blank">
         <img src="./img/Online icons/Threads.png" alt="Threads">
         <img src="./img/Online icons/Threads_color.png">
      </a>

      <!-- ไอคอน Lemon8 -->
      <a href="https://www.lemon8-app.com/yourpage" target="_blank">
         <img src="./img/Online icons/Lemon8.png" alt="Lemon8">
         <img src="./img/Online icons/Lemon8_color.png">
      </a>
   </div>

   <!-- STAY UPDATED -->
   <div class="stay-updated-container">
      <!-- ส่วน STAY UPDATED -->
      <div class="stay-updated">
         <h2>STAY</h2>
         <h2>UPDATED</h2>
      </div>
      <div class="stay-updated-divider">
         |
      </div>

      <!-- ช่องค้นหาสำหรับ SIGN UP -->
      <div class="signup-container">
         <!-- ช่องค้นหาสำหรับ SIGN UP -->
         <div class="signup-search-container">
            <input type="text" placeholder="Email address" class="signup-search-input">
            <div class="signup-search-icon">
               <img src="./img/STAY UPDATED/STAY UPDATED on.1.png" alt="Stay Updated Image">
            </div>
         </div>

         <!-- ข้อความใต้ช่องค้นหา -->
         <div class="signup-text-container">
            <p><span class="signup-highlight">SIGN UP</span> to receive inspiration, news, product updates, </p>
            <p>and special offers from our team.</p>
         </div>
      </div>
   </div>

   <!-- ช่องทางการติดต่อทั้งหมด -->
   <div class="All-contact-channels">
      <!-- PRODUCT INFO -->
      <div class="contact-section">
         <h2 class="Allcontact-Box">PRODUCT INFO</h2>
         <div class="Allcontact-Box-text">
            <p>Office</p>
            <p>Steelcase</p>
            <p>Home</p>
            <p>Kitchen</p>
            <p>Walk-in closet & Storage</p>
            <p>Hardware & Fitting</p>
            <p>Collection</p>
            <p>Project Reference</p>
            <p>Editorial</p>
            <p>News</p>
            <p>E-Catalogue</p>
            <p>Customer Care</p>
         </div>
      </div>

      <!-- CORPORATE -->
      <div class="contact-section">
         <h2 class="Allcontact-Box">CORPORATE</h2>
         <div class="Allcontact-Box-text">
            <p>About Us</p>
            <p>Investors</p>
            <p>Professionals</p>
            <p>Sustainability</p>
            <p>Career</p>
            <p>Contact</p>
         </div>
      </div>

      <!-- CUSTOMER SERVICE -->
      <div class="contact-section">
         <h2 class="Allcontact-Box">CUSTOMER SERVICE</h2>
         <div class="Allcontact-Box-text">
            <p>Find Store</p>
            <p>Warranty</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
         </div>
      </div>
   </div>

   <!-- © Modernform 2020 -->
   <div class="footer-content">
      <p>© Modernform 2020</p>
   </div>
</body>

</html>