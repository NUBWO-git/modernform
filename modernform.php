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
   <link href="https://fonts.googleapis.com/css2?family=Material+Icons&display=swap" rel="stylesheet">
</head>

<script src="./modernform.js"></script>

<body>
   <!-- แถบเมนู -->
   <nav class="navbar">
      <div class="logo-menu">
         <div class="logo">
            <img src="./img/Logo.png" alt="Logo">
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
            <li>
               <button onclick="selectLanguage('Th')" data-lang="Th" data-full-text="Th - ภาษาไทย">
                  <img src="./img/Th.png" alt="Thai Icon" class="icon"> Th - ภาษาไทย
               </button>
            </li>
            <li>
               <button onclick="selectLanguage('En')" data-lang="En" data-full-text="En - English">
                  <img src="./img/En.png" alt="English Icon" class="icon"> En - English
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

   <!-- เนื้อหาหลักของเว็บ -->
   <section class="content">
      <div class="image-container">
         <img src="./img/furniture1.png" alt="Furniture">
         <button class="more-button">ดูเพิ่มเติม</button>
      </div>
   </section>

   <div class="investor-info">
      <img src="./img/Arrow Right.png" class="arrow-icon">
      <div class="investor-text">
         <h2>INVESTORS</h2>
         <p>News & Results for Investor Relations</p>
      </div>
   </div>

   <div class="container">
      <div class="content-item">
         <img src="./img/office.png" alt="office">
         <h2>office</h2>
         <p>เพราะงานที่ดีเกิดจากการได้อยู่ในสภาพแวดล้อมที่ดีและเกิดจากสร้างสรรค์สินค้านวัตกรรม เพื่อตอบโจทย์ทุกรูปแบบการอยู่...</p>
      </div>

      <div class="content-item">
         <img src="./img/Home.png" alt="Home">
         <h2>Home</h2>
         <p>เพราะคำนิยามการใช้ชีวิตของแต่ละคนแตกต่างกันเราจึงมุ่งมั่นสร้างสรรค์สินค้านวัตกรรม เพื่อตอบโจทย์ทุกรูปแบบการอยู่...</p>
      </div>

      <div class="content-item">
         <img src="./img/Kitchen.png" alt="Kitchen">
         <h2>Kitchen</h2>
         <p>เพราะพื้นที่ครัวเปรียบเสมือนหัวใจของบ้านเป็นศูนย์กลางการรวมตัวของสมาชิก และเป็นพื้นที่แห่งการพบปะสังสรรค์...</p>
      </div>

      <div class="content-item">
         <img src="./img/Hardware & Fitting.png" alt="Hardware & Fitting">
         <h2>Hardware & Fitting</h2>
         <p>เพราะคุณภาพชีวิตที่ดีของการอยู่อาศัยล้วนเกิดจากการสรรหาสินค้า และวัสดุคุณภาพต่าง ๆ ทั่วโลก เพื่อตอบสนอง...</p>
      </div>
   </div>

   <div class="button-container">
      <button class="custom-button catalogue-button">View Product Catalogue</button>
      <button class="custom-button store-button">Visit Online Store</button>
   </div>

   <div class="swapped-layout">
      <div class="content-item">
         <img src="./img/Pinterest/Pinterest1.png">
         <h2>Pet Space Collection | เฟอร์นิเจอร์ที่ตอบรับทุกพฤติกรรมสัตว์เลี้ยง</h2>
         <p>Pet Collection เฟอร์นิเจอร์และพื้นที่สำหรับสัตว์เลี้ยงที่สะท้อนแนวคิด Pet Centric เน้นความต้องการของสัตว์ เลี้ยงเป็นหลักโดยออกแบบมาเพื่อตอบโจทย์พฤติกรรมของสัตว์เลี้ยง สามารถดีไซน์รูปแบบ และการจัดวางให้เข้ากับบ้าน  ได้ตามต้องการ</p>
         <button>Discover</button>
      </div>
      <div class="content-item">
         <img src="./img/Pinterest/Pinterest2.png">
         <h2>RHAPSODY Space Management</h2>
         <p>Rhapsody”แนวคิดการจัดพื้นที่รูปแบบใหม่สร้างขึ้นเพื่อรองรับการทำงานและการอยู่อาศัยที่ทันสมัยด้วยการแบ่งพื้นที่ใช้งานที่รองรับความหลากหลายทั้งการทำงานพฤติกรรมการใช้งาน และไลฟ์สไตล์ของผู้คนที่ใช้งานในยุคปัจจุบัน</p>
         <button>Discover</button>
      </div>
      <div class="content-item">
         <img src="./img/Pinterest/Pinterest3.png">
         <h2>Steelcase THINK V2 Glow up your style |เปล่งประกายในสไตล์ ที่เป็นคุณ</h2>
         <p>THINK V2 เก้าอี้เพื่อสุขภาพที่มาพร้อมฟังก์ชันครบครัน ซัพพอร์ตสรีระการนั่งทำงานได้อย่างลงตัว ด้วยระบบปรับอัตโนมัติ ที่ตอบสนองต่อการเคลื่อนไหวจะ WFH หรือ Hybrid Working ก็เนรมิต Working Space ให้ Glow ในแบบที่เป็นตัวเอง </p>
         <button>Discover</button>
      </div>
      <div class="content-item">
         <img src="./img/Pinterest/Pinterest4.png"> 
         <h2>มุมทำงานที่ใช่ ตอบโจทย์สไตล์ในแบบคุณ</h2>
         <p>พบกับไอเดียการจัดมุมทำงานในสไตล์ต่าง ๆ ที่ช่วยกระตุ้นไอเดีย และเพิ่ม Energy ให้ทุกวันทำงาน ผ่านเฟอร์นิเจอร์หลาก ดีไซน์</p>
         <button>Discover</button>
      </div>
   </div>
</body>

</html>