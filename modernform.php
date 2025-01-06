<?php
session_start(); // เริ่มต้น session เพื่อเก็บข้อมูลภาษา

// ตรวจสอบว่ามีการเลือกภาษาใหม่หรือไม่
if (isset($_POST['language'])) {
    $_SESSION['language'] = $_POST['language']; // เก็บภาษาที่เลือกใน session
} elseif (!isset($_SESSION['language'])) {
    $_SESSION['language'] = 'en'; // กำหนดค่าเริ่มต้นเป็นภาษาอังกฤษ
}
$language = $_SESSION['language']; // ใช้ภาษาที่เก็บใน session
?>