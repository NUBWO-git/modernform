document.addEventListener('DOMContentLoaded', () => {
   const menuItems = document.querySelectorAll('.menu-bar ul li');
   
   // ตรวจสอบว่า menuItems มีค่า
   if (menuItems.length > 0) {
      // โหลดค่าเมนูที่ถูกเลือกจาก localStorage
      const savedMenuIndex = localStorage.getItem('activeMenuIndex');
      
      // ถ้ามีค่าเมนูที่เลือกไว้ใน localStorage
      if (savedMenuIndex !== null) {
         // ลบคลาส 'active' ออกจากทุกเมนู
         menuItems.forEach(item => item.classList.remove('active'));
         
         // เพิ่มคลาส 'active' ให้กับเมนูที่ถูกเลือกจาก localStorage
         menuItems[savedMenuIndex].classList.add('active');
      } else {
         // ถ้าไม่มีการเลือกเมนูใน localStorage, ให้เลือกเมนูแรก
         menuItems[0].classList.add('active');
         localStorage.setItem('activeMenuIndex', 0);
      }

      // ตรวจจับการคลิกที่เมนู
      menuItems.forEach((item, index) => {
         item.addEventListener('click', () => {
            // ลบคลาส 'active' ออกจากทุกเมนู
            menuItems.forEach(el => el.classList.remove('active'));
            
            // เพิ่มคลาส 'active' ให้กับเมนูที่คลิก
            item.classList.add('active');
            
            // บันทึก index ของเมนูที่คลิกใน localStorage
            localStorage.setItem('activeMenuIndex', index);
         });
      });
   } else {
      console.error('ไม่พบเมนูใน DOM');
   }
});
