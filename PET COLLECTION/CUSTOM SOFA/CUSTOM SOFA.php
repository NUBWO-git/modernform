<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

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

// รับค่าการเรียงลำดับจาก GET
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ล่าสุด';
$orderBy = "created_at DESC"; // ค่าเริ่มต้นเรียงตามวันที่อัปโหลดล่าสุด
if ($sort === "ตัวอักษร") {
   $orderBy = "name ASC"; // ถ้าเลือกเรียงตามตัวอักษร
}

// ดึงข้อมูลจากตาราง custom_sofa
$sql = "SELECT id, name, image, category, created_at FROM custom_sofa ORDER BY $orderBy";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $imageURL = "custom sofa table/uploads/" . $row['image'];

      $images[] = [
         'id' => $row['id'],
         'name' => $row['name'],
         'src' => $imageURL,
         'category' => $row['category'],
         'created_at' => $row['created_at']
      ];
   }
}

// ตั้งค่า Content-Type เป็น JSON
header('Content-Type: application/json');

// ส่งข้อมูลเป็น JSON
echo json_encode($images);

$conn->close();
?>
