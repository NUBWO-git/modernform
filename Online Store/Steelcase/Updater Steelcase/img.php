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

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["image"])) {
   // รับข้อมูลจากฟอร์ม
   $name = htmlspecialchars(trim($_POST["name"] ?? ""));
   $category = htmlspecialchars(trim($_POST["category"] ?? ""));

   // ตรวจสอบค่าที่จำเป็น
   if (empty($name) || empty($category)) {
      die("กรุณากรอกข้อมูลให้ครบถ้วน!");
   }

   // ตรวจสอบไฟล์ที่อัปโหลด
   $file = $_FILES["image"];
   if ($file["error"] !== UPLOAD_ERR_OK) {
      die("เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
   }

   // ตั้งค่าโฟลเดอร์สำหรับการอัปโหลดไฟล์
   $targetDir = "uploads/";
   if (!is_dir($targetDir)) {
      mkdir($targetDir, 0777, true);
   }

   $fileName = basename($file["name"]);
   $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
   $newFileName = time() . "_" . uniqid() . "." . $fileType;
   $targetFilePath = $targetDir . $newFileName;

   // ตรวจสอบประเภทไฟล์
   $allowedTypes = ["jpg", "jpeg", "png", "gif"];
   if (!in_array($fileType, $allowedTypes)) {
      die("อนุญาตให้แนบเฉพาะไฟล์ .jpg, .jpeg, .png, .gif เท่านั้น");
   }

   // ตรวจสอบขนาดไฟล์
   if ($file["size"] > 5 * 1024 * 1024) { // 5MB
      die("ไฟล์ต้องไม่เกิน 5MB");
   }

   // ย้ายไฟล์ไปยังโฟลเดอร์
   if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
      // เพิ่มข้อมูลในฐานข้อมูล
      $sql = "INSERT INTO Steelcase (name, category, image_url) VALUES (?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sss", $name, $category, $newFileName);

      if ($stmt->execute()) {
         echo "อัปโหลดและบันทึกข้อมูลสำเร็จ!";
      } else {
         echo "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " . $conn->error;
      }

      $stmt->close();
   } else {
      echo "เกิดข้อผิดพลาดในการอัปโหลดไฟล์";
   }
}

$conn->close();
