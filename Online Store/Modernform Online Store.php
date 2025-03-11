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

// รับค่าการเรียงลำดับจาก GET
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ล่าสุด';
$orderBy = "uploaded_at DESC"; // ค่าเริ่มต้นการเรียงตามวันที่อัปโหลดล่าสุด
if ($sort === "ตัวอักษร") {
   $orderBy = "name ASC"; // ถ้าเลือกเรียงตามตัวอักษร
}

// รับค่าหมวดหมู่และหมวดย่อยจาก GET
$category = isset($_GET['category']) ? $_GET['category'] : null;
$subCategory = isset($_GET['subCategory']) ? $_GET['subCategory'] : null;
$subSubCategory = isset($_GET['subSubCategory']) ? $_GET['subSubCategory'] : null;

// สร้าง WHERE Clause ให้รองรับ subCategory และ subSubCategory
$whereClauses = [];
if ($category) {
   $whereClauses[] = "category = '" . $conn->real_escape_string($category) . "'";
}
if ($subCategory) {
   $whereClauses[] = "subCategory = '" . $conn->real_escape_string($subCategory) . "'";
}
if ($subSubCategory) {
   $whereClauses[] = "subSubCategory = '" . $conn->real_escape_string($subSubCategory) . "'";
}

$whereSQL = !empty($whereClauses) ? "WHERE " . implode(" AND ", $whereClauses) : "";

// คำสั่ง SQL ใหม่ที่รองรับหมวดย่อย
$sql = "SELECT filename, name, category, subCategory, subSubCategory, uploaded_at FROM product_data $whereSQL ORDER BY $orderBy";

$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "src" => str_replace(" ", "%20", "Upload image/uploads/" . $row["filename"]), // เปลี่ยนช่องว่างใน URL เป็น %20
         "name" => $row["name"],
         "category" => $row["category"],
         "subCategory" => $row["subCategory"],
         "subSubCategory" => $row["subSubCategory"],
         "uploaded_at" => $row["uploaded_at"]
      ];
   }
}

// คืนค่าเป็น JSON
echo json_encode($images ?: []); // คืนค่าเป็น array ว่างถ้าไม่มีข้อมูล
$conn->close();
