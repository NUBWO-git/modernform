<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
   http_response_code(200);
   exit;
}

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

$category = isset($_GET['category']) ? trim($_GET['category']) : null;

if ($category) {
   $sql = "SELECT name, category, image, created_at FROM walk_in WHERE category = ? ORDER BY created_at DESC";
   $stmt = $conn->prepare($sql);
   if (!$stmt) {
      echo json_encode(["error" => "Query prepare failed: " . $conn->error]);
      exit;
   }
   $stmt->bind_param("s", $category);
   $stmt->execute();
   $result = $stmt->get_result();
   $stmt->close();
} else {
   $sql = "SELECT name, category, image, created_at FROM walk_in ORDER BY created_at DESC";
   $result = $conn->query($sql);
}

$products = [];
while ($row = $result->fetch_assoc()) {
   $imageSrc = './Walk-in Save/uploads/' . rawurlencode($row["image"]);
   $products[] = [
      "name" => $row["name"],
      "category" => $row["category"],
      "src" => $imageSrc,
      "created_at" => $row["created_at"]
   ];
}

echo json_encode($products, JSON_PRETTY_PRINT);

$conn->close();
?>