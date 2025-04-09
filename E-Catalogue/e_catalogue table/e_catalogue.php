<?php
// ตั้งค่าการเชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "modernform");

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn->connect_error) {
   die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["image"])) {
   $targetDir = "uploads/";  // โฟลเดอร์สำหรับเก็บไฟล์
   if (!is_dir($targetDir)) {
      mkdir($targetDir, 0777, true);  // สร้างโฟลเดอร์ 'uploads' ถ้ายังไม่มี
   }

   $fileName = uniqid() . "_" . basename($_FILES["image"]["name"]);  // เปลี่ยนชื่อไฟล์ให้ไม่ซ้ำ
   $targetFile = $targetDir . $fileName;
   $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

   // ตรวจสอบประเภทไฟล์
   if (in_array($imageFileType, ["jpg", "jpeg", "png", "gif"])) {
      // ตรวจสอบว่าไฟล์สามารถอัปโหลดได้หรือไม่
      if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
         // บันทึกไฟล์ path ลงในฐานข้อมูล
         $stmt = $conn->prepare("INSERT INTO e_catalogue (image_path) VALUES (?)");
         $stmt->bind_param("s", $targetFile);

         if ($stmt->execute()) {
            echo "อัปโหลดไฟล์สำเร็จ!";
         } else {
            echo "เกิดข้อผิดพลาดในการบันทึกข้อมูลลงฐานข้อมูล";
         }
         $stmt->close();
      } else {
         echo "ไม่สามารถอัปโหลดไฟล์ได้";
      }
   } else {
      echo "รูปภาพที่อัปโหลดไม่ใช่ไฟล์ที่รองรับ (JPG, JPEG, PNG, GIF)";
   }
} else {
   echo "กรุณาเลือกไฟล์เพื่ออัปโหลด";
}

$conn->close();  // ปิดการเชื่อมต่อฐานข้อมูล
