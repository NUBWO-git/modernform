<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
   exit;
}

// รับค่าหมวดหมู่จาก GET และลบช่องว่างที่ขึ้นต้น/ลงท้าย
$category = isset($_GET['category']) ? trim($_GET['category']) : null;

if ($category) {
   $sql = "SELECT name, category, image_url, uploaded_at FROM steelcase WHERE category = ? ORDER BY uploaded_at DESC";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("s", $category);
} else {
   $sql = "SELECT name, category, image_url, uploaded_at FROM steelcase ORDER BY uploaded_at DESC";
   $stmt = $conn->prepare($sql);
}

// ดึงข้อมูลจากฐานข้อมูล
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
   $products[] = [
      "name" => $row["name"],
      "category" => $row["category"],
      "src" => "./Updater Steelcase/uploads/" . urlencode($row["image_url"]), // ใช้ `urlencode()` ป้องกันปัญหาช่องว่างใน URL
      "uploaded_at" => $row["uploaded_at"]
   ];
}

// ส่งออกข้อมูลเป็น JSON
echo json_encode($products);

// ปิดการเชื่อมต่อ
$stmt->close();
$conn->close();
