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

// รับค่าการเรียงลำดับจาก GET
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ล่าสุด';
$orderBy = "created_at DESC"; // ค่าเริ่มต้นการเรียงตามวันที่อัปโหลดล่าสุด
if ($sort === "ตัวอักษร") {
   $orderBy = "name ASC"; // ถ้าเลือกเรียงตามตัวอักษร
}

// ดึงข้อมูลจากตาราง custom_table
$sql = "SELECT id, name, image, category, created_at FROM custom_table ORDER BY $orderBy";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   // เพิ่มข้อมูลลงในอาร์เรย์
   while ($row = $result->fetch_assoc()) {
      // เพิ่ม URL รูปภาพให้ถูกต้อง
      $imageURL = "Custom table/uploads/" . $row['image']; // ปรับให้เป็น URL ที่ถูกต้อง

      $images[] = [
         'id' => $row['id'],
         'name' => $row['name'],
         'src' => $imageURL, // ส่ง URL รูปภาพ
         'category' => $row['category'],
         'created_at' => $row['created_at'] // ใช้ $row['created_at']
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
