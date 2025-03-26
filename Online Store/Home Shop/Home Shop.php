<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// เปิดการแสดงข้อผิดพลาด
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
   exit;
}

// รับค่าหมวดหมู่และหมวดย่อยจาก GET
$mainMenu = isset($_GET['main_menu']) ? $_GET['main_menu'] : null;
$subMenu = isset($_GET['sub_menu']) ? $_GET['sub_menu'] : null;
$subSubMenu = isset($_GET['sub_sub_menu']) ? $_GET['sub_sub_menu'] : null;

// สร้าง WHERE Clause ให้รองรับ main_menu, sub_menu และ sub_sub_menu
$whereClauses = [];
$params = [];
$paramTypes = "";

if ($mainMenu) {
   $whereClauses[] = "main_menu = ?";
   $params[] = $mainMenu;
   $paramTypes .= "s";
}
if ($subMenu) {
   $whereClauses[] = "sub_menu = ?";
   $params[] = $subMenu;
   $paramTypes .= "s";
}
if ($subSubMenu) {
   $whereClauses[] = "sub_sub_menu = ?";
   $params[] = $subSubMenu;
   $paramTypes .= "s";
}

$whereSQL = !empty($whereClauses) ? "WHERE " . implode(" AND ", $whereClauses) : "";

// เตรียมคำสั่ง SQL
$sql = "SELECT id, name, image, main_menu, sub_menu, sub_sub_menu, created_at FROM home_shop $whereSQL ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);

// ผูกค่าพารามิเตอร์
if ($params) {
   $stmt->bind_param($paramTypes, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "id" => $row["id"],
         "name" => $row["name"],
         "src" => str_replace(" ", "%20", "./home_shop_data/uploads/" . $row["image"]), // เปลี่ยนช่องว่างใน URL เป็น %20
         "main_menu" => $row["main_menu"],
         "sub_menu" => $row["sub_menu"],
         "sub_sub_menu" => $row["sub_sub_menu"],
         "created_at" => $row["created_at"]
      ];
   }
}

// คืนค่าเป็น JSON
echo json_encode($images ?: []); // คืนค่าเป็น array ว่างถ้าไม่มีข้อมูล
$conn->close();
?>
