function updateLanguageLabel() {
   const selector = document.getElementById('languageSelector');
   const selectedValue = selector.value;

   // Map ค่าของภาษาให้แสดงตัวย่อ
   const languageMap = {
      en: 'En',
      th: 'Th'
   };

   // อัปเดตข้อความของ Label เป็นตัวย่อ
   const label = document.getElementById('languageLabel');
   label.textContent = languageMap[selectedValue] || '';
}