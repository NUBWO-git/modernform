<?php
session_start(); // เริ่มเซสชัน

// ตรวจสอบการเลือกภาษา
if (isset($_POST['language'])) {
   $_SESSION['language'] = $_POST['language']; // เก็บภาษาในเซสชัน
} else {
   // ถ้าไม่มีการเลือกภาษาให้ใช้ภาษาเริ่มต้น
   if (!isset($_SESSION['language'])) {
      $_SESSION['language'] = 'en'; // ภาษาเริ่มต้นเป็นภาษาอังกฤษ
   }
}

// เปลี่ยนเส้นทางไปยังหน้าแรกหลังจากเลือกภาษา
header('Location: index.php');
exit();
