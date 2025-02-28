// หมวดหมู่ทั้งหมด
const categories = {
   Gaming: [],
   Workspace: {
      Desk: ["Desk System", "Height adjust table", "Bench Work"],
      Chair: ["Office", "Executive", "Occasional", "Ergonomic"],
      Panel: []
   },
   Executive: ["Desk", "Chairs"],
   "Meeting & Conference": {
      Conference: ["Desk", "Chairs"],
      Training: ["Chairs"],
      Auditorium: []
   },
   "Lounge area": ["Office", "Executive", "Occasional", "Ergonomic"],
   "Collaboration space": {
      Table: ["Bench"],
      Seating: ["Sofa", "Lounge chair", "Occasional chair", "Stool", "Barstool"],
      "Collaboration space": []
   },
   Storage: ["Cabinet", "Mobile Pedestal"],
   Itoki: [],
   "Workplace Planning Solution": [],
   "Modernform x PDM": []
};

// โหลดหมวดหมู่หลัก
function updateCategories() {
   const categorySelect = document.getElementById("category");
   categorySelect.innerHTML = "<option value=''>-- เลือกหมวดหลัก --</option>";

   Object.keys(categories).forEach(category => {
      const option = new Option(category, category);
      categorySelect.appendChild(option);
   });
}

// โหลดหมวดย่อย
function updateSubCategories() {
   const category = document.getElementById("category").value;
   const subCategorySelect = document.getElementById("subCategory");
   const subSubCategorySelect = document.getElementById("subSubCategory");

   subCategorySelect.innerHTML = "<option value=''>-- เลือกหมวดย่อย --</option>";
   subSubCategorySelect.innerHTML = "<option value=''>-- เลือกหมวดย่อยที่สุด --</option>";

   if (category && categories[category]) {
      const subCategories = categories[category];
      
      if (Array.isArray(subCategories) && subCategories.length > 0) {
         subCategories.forEach(subCategory => subCategorySelect.appendChild(new Option(subCategory, subCategory)));
      } else if (typeof subCategories === 'object') {
         Object.keys(subCategories).forEach(subCategory => subCategorySelect.appendChild(new Option(subCategory, subCategory)));
      } else {
         subCategorySelect.innerHTML = "<option value='none'>ไม่มีหมวดย่อย</option>";
      }
   }
}

// โหลดหมวดย่อยที่สุด
function updateSubSubCategories() {
   const category = document.getElementById("category").value;
   const subCategory = document.getElementById("subCategory").value;
   const subSubCategorySelect = document.getElementById("subSubCategory");

   subSubCategorySelect.innerHTML = "<option value=''>-- เลือกหมวดย่อยที่สุด --</option>";

   if (category && subCategory && categories[category] && categories[category][subCategory]) {
      const subSubCategories = categories[category][subCategory];

      if (Array.isArray(subSubCategories) && subSubCategories.length > 0) {
         subSubCategories.forEach(subSubCategory => subSubCategorySelect.appendChild(new Option(subSubCategory, subSubCategory)));
      } else {
         subSubCategorySelect.innerHTML = "<option value='none'>ไม่มีหมวดย่อยที่สุด</option>";
      }
   }
}

function loadImages() {
   fetch('Upload.php') // ตรวจสอบให้แน่ใจว่า URL นี้ถูกต้อง
      .then(response => {
         if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
         }
         return response.json();
      })
      .then(images => {
         const gallery = document.getElementById("gallery");
         gallery.innerHTML = ""; // เคลียร์ข้อมูลเก่า

         if (images.length === 0) {
            gallery.innerHTML = "<p>ไม่พบรูปภาพ</p>"; // แสดงข้อความเมื่อไม่มีรูปภาพ
            return;
         }

         images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.src; 
            imgElement.alt = image.name; 
            imgElement.classList.add("gallery-image");

            const nameElement = document.createElement("div");
            nameElement.textContent = `ชื่อ: ${image.name}`;

            const categoryElement = document.createElement("div");
            categoryElement.textContent = `หมวดหมู่: ${image.category}`;

            gallery.append(imgElement, nameElement, categoryElement);
         });
      })
      .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดรูปภาพ:", error));
}

document.addEventListener("DOMContentLoaded", function () {
   updateCategories();
   loadImages(); // โหลดรูปภาพเมื่อหน้าโหลดเสร็จ
   document.getElementById("category").addEventListener("change", updateSubCategories);
   document.getElementById("subCategory").addEventListener("change", updateSubSubCategories);
});
