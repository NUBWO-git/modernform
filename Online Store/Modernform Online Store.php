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

// ดึงข้อมูลรูปภาพจากฐานข้อมูล
$sql = "SELECT filename FROM product_data";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "src" => "uploads/" . $row["filename"],
         "name" => $row["name"], // เพิ่มชื่อภาพที่นี่
         "category" => $row["category"]
      ];
   }
}

// ส่งข้อมูลรูปภาพในรูปแบบ JSON
header('Content-Type: application/json');
echo json_encode($images);

$conn->close();
?>