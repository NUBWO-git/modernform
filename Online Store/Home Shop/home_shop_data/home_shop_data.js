// หมวดหมู่ทั้งหมด
const categories = {
   "Living room": {
      Sofa: ["Modern sofa", "Classic sofa", "Contemp sofa"],
      "Day beds": [],
      Recliner: [],
      "Leisure chair": [],
      "Decoration items": [],
      "Coffee table": [],
      "End Table": [],
      Sideboard: []
   },
   "Dining room": {
      "Dining table": [],
      "Dining chair": [],
      Console: [],
      "Buffet cabinet": []
   },
   Bedroom: {
      Bed: [],
      "Night table": [],
      "Dining table": [],
      Bench: []
   },
   "Modernspace Series": []
};

// โหลดหมวดหมู่หลัก
function updateCategories() {
   const mainMenuSelect = document.getElementById("main_menu");
   mainMenuSelect.innerHTML = "<option value=''>-- เลือกหมวดหลัก --</option>";

   Object.keys(categories).forEach(category => {
      const option = new Option(category, category);
      mainMenuSelect.appendChild(option);
   });
}

// โหลดหมวดย่อย
function updateSubCategories() {
   const category = document.getElementById("main_menu").value;
   const subMenuSelect = document.getElementById("sub_menu");
   const subSubMenuSelect = document.getElementById("sub_sub_menu");

   subMenuSelect.innerHTML = "<option value=''>-- เลือกหมวดย่อย --</option>";
   subSubMenuSelect.innerHTML = "<option value=''>-- เลือกหมวดย่อยที่สุด --</option>";

   if (category && categories[category]) {
      const subCategories = categories[category];

      if (Object.keys(subCategories).length > 0) {
         Object.keys(subCategories).forEach(subCategory => {
            subMenuSelect.appendChild(new Option(subCategory, subCategory));
         });
      } else {
         subMenuSelect.innerHTML = "<option value='none'>ไม่มีหมวดย่อย</option>";
      }
   }
}

// โหลดหมวดย่อยที่สุด
function updateSubSubCategories() {
   const category = document.getElementById("main_menu").value;
   const subCategory = document.getElementById("sub_menu").value;
   const subSubMenuSelect = document.getElementById("sub_sub_menu");

   subSubMenuSelect.innerHTML = "<option value=''>-- เลือกหมวดย่อยที่สุด --</option>";

   if (category && subCategory && categories[category] && categories[category][subCategory]) {
      const subSubCategories = categories[category][subCategory];

      if (subSubCategories.length > 0) {
         subSubCategories.forEach(subSubCategory => {
            subSubMenuSelect.appendChild(new Option(subSubCategory, subSubCategory));
         });
      } else {
         subSubMenuSelect.innerHTML = "<option value='none'>ไม่มีหมวดย่อยที่สุด</option>";
      }
   }
}

document.addEventListener("DOMContentLoaded", function () {
   updateCategories(); // โหลดหมวดหมู่หลัก
   document.getElementById("main_menu").addEventListener("change", updateSubCategories);
   document.getElementById("sub_menu").addEventListener("change", updateSubSubCategories);
});
