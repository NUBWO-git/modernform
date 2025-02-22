<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modernform";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT filename, category, subCategory, subSubCategory, name FROM product_data";
$result = $conn->query($sql);

$images = [];
while ($row = $result->fetch_assoc()) {
   $images[] = $row;
}

echo json_encode($images);
$conn->close();
?>
