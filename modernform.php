<?php
// ตรวจสอบว่ามีการส่งค่าภาษามาหรือไม่
session_start(); // ต้องเริ่ม session ก่อนเพื่อให้การทำงานของ session ใช้งานได้
if (isset($_POST['language'])) {
    $language = $_POST['language'];
    // บันทึกภาษาที่เลือกใน session
    $_SESSION['language'] = $language;
} elseif (isset($_SESSION['language'])) {
    // ถ้ามีการตั้งค่าใน session แล้ว ให้ใช้ค่านั้น
    $language = $_SESSION['language'];
} else {
    // กำหนดค่าเริ่มต้นเป็นภาษาอังกฤษ
    $language = 'en';
}
?>

<!DOCTYPE html>
<html lang="<?php echo $language; ?>">

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

<script>
    function updateLanguageLabel() {
        const selector = document.getElementById('languageSelector');
        const label = document.getElementById('languageLabel');
        const selectedValue = selector.value;

        // Map ค่าของภาษาให้แสดงชื่อเต็ม
        const languageMap = {
            en: 'English',
            th: 'ภาษาไทย'
        };

        // อัปเดตข้อความของ Label
        label.textContent = languageMap[selectedValue] || '';
    }
</script>

<body>
    <!-- แถบเมนู -->
    <nav class="navbar">
        <div class="logo-menu">
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
        </div>
        <div class="language-and-icons">
            <form method="POST" action="language.php">
                <select class="language-selector" id="languageSelector" name="language" onchange="updateLanguageLabel()">
                    <option value="en" <?php echo ($language == 'en') ? 'selected' : ''; ?>>En</option>
                    <option value="th" <?php echo ($language == 'th') ? 'selected' : ''; ?>>Th</option>
                </select>
                <span id="languageLabel">
                    <?php echo ($language == 'en') ? 'English' : 'ภาษาไทย'; ?>
                </span>
                <button type="submit" style="display: none;"></button>
            </form>
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