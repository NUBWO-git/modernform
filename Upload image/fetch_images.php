<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$sql = "SELECT filename, name, category FROM product_data";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $filePath = "uploads/" . $row["filename"];

      // ตรวจสอบว่าไฟล์มีอยู่จริง
      if (file_exists($filePath)) {
         $images[] = [
            "src" => "http://localhost/modernform/" . $filePath,
            "name" => $row["name"],
            "category" => $row["category"]
         ];
      } else {
         error_log("File not found: " . $filePath); // บันทึกการไม่พบไฟล์ใน log
      }
   }
} else {
   error_log("No images found in database."); // บันทึกถ้าไม่มีรูปภาพในฐานข้อมูล
}

header('Content-Type: application/json');
echo json_encode($images, JSON_UNESCAPED_UNICODE);
$conn->close();
