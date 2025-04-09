<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// ดึงข้อมูลจากตาราง e_catalogue รวมทั้ง upload_time
$sql = "SELECT id, image_path, upload_time FROM e_catalogue ORDER BY upload_time DESC";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   // เพิ่มข้อมูลลงในอาร์เรย์
   while ($row = $result->fetch_assoc()) {
      // เพิ่ม URL รูปภาพให้ถูกต้อง
      $imageURL = "./e_catalogue table/uploads/" . basename($row['image_path']); // ปรับให้เป็น URL ที่ถูกต้อง

      $images[] = [
         'id' => $row['id'],
         'src' => $imageURL, // ส่ง URL รูปภาพ
         'upload_time' => $row['upload_time'] // เพิ่มเวลาที่อัปโหลด
      ];
   }
}

// ตั้งค่าการตอบกลับให้เป็น JSON
header('Content-Type: application/json');

// ส่งข้อมูลเป็น JSON
echo json_encode($images);

// ปิดการเชื่อมต่อ
$conn->close();
?>