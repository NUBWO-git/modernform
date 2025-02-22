<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// ตรวจสอบว่ามีการกด submit และมีไฟล์ถูกอัปโหลด
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["image"])) {
   // รับค่าจากฟอร์มและป้องกัน SQL Injection
   $category = htmlspecialchars(trim($_POST["category"] ?? ""));
   $subCategory = htmlspecialchars(trim($_POST["subCategory"] ?? NULL));
   $subSubCategory = htmlspecialchars(trim($_POST["subSubCategory"] ?? NULL));
   $name = htmlspecialchars(trim($_POST["name"] ?? ""));

   // ตรวจสอบค่าที่จำเป็น
   if (empty($category) || empty($name)) {
      die("กรุณากรอกข้อมูลให้ครบถ้วน!");
   }

   // ตรวจสอบว่ามีไฟล์ถูกอัปโหลดจริง
   if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK) {
      die("เกิดข้อผิดพลาดในการอัปโหลดไฟล์: " . $_FILES["image"]["error"]);
   }

   // ตั้งค่าโฟลเดอร์สำหรับอัปโหลดไฟล์
   $targetDir = "uploads/";
   if (!is_dir($targetDir)) {
      mkdir($targetDir, 0777, true); // สร้างโฟลเดอร์ถ้ายังไม่มี
   }

   $fileName = basename($_FILES["image"]["name"]);
   $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
   $newFileName = time() . "_" . uniqid() . "." . $fileType; // ตั้งชื่อไฟล์ใหม่ให้ไม่ซ้ำ
   $targetFilePath = $targetDir . $newFileName;

   // ตรวจสอบประเภทไฟล์
   $allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
   if (!in_array($fileType, $allowedTypes)) {
      die("อนุญาตให้อัปโหลดเฉพาะไฟล์ JPG, JPEG, PNG, GIF และ WEBP เท่านั้น!");
   }

   // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
   if ($_FILES["image"]["size"] > 5 * 1024 * 1024) {
      die("ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)!"); 
   }

   // ย้ายไฟล์ไปที่โฟลเดอร์ uploads
   if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
      // เพิ่มข้อมูลลงฐานข้อมูล
      $sql = "INSERT INTO product_data (category, subCategory, subSubCategory, filename, name, uploaded_at) 
            VALUES (?, ?, ?, ?, ?, NOW())";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sssss", $category, $subCategory, $subSubCategory, $newFileName, $name);

      if ($stmt->execute()) {
         echo "อัปโหลดไฟล์สำเร็จ!";
      } else {
         echo "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " . $conn->error;
      }

      $stmt->close();
   } else {
      echo "อัปโหลดไฟล์ล้มเหลว!";
   }
}

// ดึงข้อมูลรูปภาพจากฐานข้อมูล
$sql = "SELECT filename, name FROM product_data";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "src" => "uploads/" . $row["filename"],
         "name" => $row["name"] // เพิ่มชื่อภาพที่นี่
      ];
   }
}

// ส่งข้อมูลรูปภาพในรูปแบบ JSON
header('Content-Type: application/json');
echo json_encode($images);

$conn->close();
