<?php
// ตรวจสอบการเลือกภาษา (ในกรณีที่เลือกภาษาแล้ว)
if (isset($_POST['language'])) {
    $language = $_POST['language'];
} else {
    $language = 'en'; // ค่าเริ่มต้นเป็นภาษาอังกฤษ
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modernform</title>
    <link rel="stylesheet" href="modernform.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&family=Mochiy+Pop+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>

<body>
    <!-- แถบเมนู -->
    <nav class="navbar">
        <div class="logo">
            <a href="#">Modernform</a>
        </div>
        <ul class="nav-links">
            <li><a href="#">Products</a></li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">Project Reference</a></li>
            <li><a href="#">E-Catalogue</a></li>
            <li><a href="#">Export</a></li>
            <li><a href="#">Online Store</a></li>
        </ul>
        <div class="language-and-icons">
            <select class="language-selector" id="languageSelector">
                <option value="en" data-full-name="English">En-English</option>
                <option value="th" data-full-name="Thai">Th-ภาษาไทย</option>
            </select>
            <div class="search-icon">
                <span class="material-symbols-outlined">search</span>
            </div>
            <div class="gps-icon">
                <span class="material-symbols-outlined">location_on</span>
            </div>
        </div>

    </nav>

    <!-- เนื้อหาหลักของเว็บ -->
    <section class="content">
        <h1>Welcome to Modernform Website</h1>
        <p>This is a modern bar example.</p>
    </section>
</body>

</html>