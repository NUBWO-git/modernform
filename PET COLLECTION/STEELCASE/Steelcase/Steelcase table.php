<?php
// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// ตรวจสอบว่ามีการส่งฟอร์มหรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $name = trim($_POST["name"]);
   $category = trim($_POST["category"]);

   // ตรวจสอบว่ามีไฟล์อัปโหลดหรือไม่
   if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
      $target_dir = "uploads/"; // โฟลเดอร์เก็บรูป
      if (!is_dir($target_dir)) {
         mkdir($target_dir, 0777, true); // สร้างโฟลเดอร์หากไม่มี
      }

      $file_name = basename($_FILES["image"]["name"]);
      $imageFileType = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
      $allowed_types = ["jpg", "jpeg", "png", "gif"];
      $file_size = $_FILES["image"]["size"];
      $max_size = 5 * 1024 * 1024; // จำกัดขนาดไฟล์ไม่เกิน 5MB

      // ตั้งชื่อไฟล์ใหม่ให้ไม่ซ้ำ โดยใช้ timestamp
      $new_file_name = time() . "-" . basename($_FILES["image"]["name"]);
      $target_file = $target_dir . $new_file_name;


      // ตรวจสอบประเภทไฟล์และขนาด
      if (!in_array($imageFileType, $allowed_types)) {
         die("อนุญาตเฉพาะไฟล์ JPG, JPEG, PNG, GIF เท่านั้น");
      }
      if ($file_size > $max_size) {
         die("ขนาดไฟล์ต้องไม่เกิน 5MB");
      }

      // อัปโหลดไฟล์
      if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
         // บันทึกลงฐานข้อมูล (ใช้ Prepared Statement)
         $sql = "INSERT INTO steelcase_table (name, image, category, created_at) VALUES (?, ?, ?, NOW())";
         $stmt = $conn->prepare($sql);
         $stmt->bind_param("sss", $name, $new_file_name, $category);

         if ($stmt->execute()) {
            echo "อัปโหลดและบันทึกข้อมูลเรียบร้อย";
         } else {
            echo "เกิดข้อผิดพลาด: " . $stmt->error;
         }

         $stmt->close();
      } else {
         echo "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ";
      }
   } else {
      echo "กรุณาเลือกไฟล์รูปภาพ";
   }
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
