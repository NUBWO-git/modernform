<?php
header('Content-Type: application/json'); // กำหนดให้ส่ง JSON

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT filename, name, category FROM product_data";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
      $images[] = [
         "src" => "Upload image/uploads/" . $row["filename"],
         "name" => $row["name"],
         "category" => $row["category"]
      ];
   }
} else {
   die(json_encode(["error" => "No images found"]));
}

echo json_encode($images);
$conn->close();
