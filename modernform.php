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
<html lang="<?php echo $language; ?>">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Modernform</title>
   <link rel="stylesheet" href="modernform.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>

<script src="./modernform.js"></script>

<body>
   <!-- แถบเมนู -->
   <nav class="navbar">
      <div class="logo-menu">
         <div class="logo">
            <a href="#">Modernform</a>
         </div>
         <ul class="nav-links">
            <li><a href="#">Products</a></li>
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
            <li><button onclick="selectLanguage('Th')" data-lang="Th" data-full-text="Th - ภาษาไทย">
                  <img src="./img/Th.png" alt="Thai Icon" class="icon"> Th - ภาษาไทย
               </button></li>
            <li><button onclick="selectLanguage('En')" data-lang="En" data-full-text="En - English">
                  <img src="./img/En.png" alt="English Icon" class="icon"> En - English
               </button></li>
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

   <!-- เนื้อหาหลักของเว็บ -->
   <section class="content">
      <h1>Welcome to Modernform Website</h1>
      <p>This is a modern bar example</p>

      <!-- เพิ่มรูปภาพ -->
      <img src="./img/Th.png" alt="Thai Flag" style="width: 100px; height: auto; margin-top: 20px;">
      <img src="./img/En.png" alt="English Flag" style="width: 100px; height: auto; margin-top: 20px;">
   </section>
</body>

</html>