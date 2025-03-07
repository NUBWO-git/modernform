<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // แก้ปัญหา CORS ถ้าจำเป็น
header("Access-Control-Allow-Methods: GET");

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

// กำหนดเงื่อนไขการเรียงลำดับ
$orderBy = "uploaded_at DESC"; // ค่าเริ่มต้น: เรียงตามวันที่ใหม่สุด
if ($sort === "ตัวอักษร") {
   $orderBy = "name ASC"; // เรียงตามชื่อ A-Z
}

$sql = "SELECT filename, name, category, subCategory, subSubCategory, uploaded_at FROM product_data ORDER BY $orderBy";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "src" => str_replace(" ", "%20", "Upload image/uploads/" . $row["filename"]), // แก้ไขช่องว่างใน URL
         "name" => $row["name"],
         "category" => $row["category"],
         "subCategory" => $row["subCategory"],
         "subSubCategory" => $row["subSubCategory"],
         "uploaded_at" => $row["uploaded_at"]
      ];
   }
}

// แทนที่จะใช้ die() ให้คืนค่าเป็น [] ถ้าไม่มีข้อมูล
echo json_encode($images ?: []);
$conn->close();
