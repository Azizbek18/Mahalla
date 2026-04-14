// 1. Porsiya sonini boshqarish (+ va - tugmalari)
const portionValue = document.querySelector('.portion-selector span');
const btnMinus = document.querySelector('.btn-minus');
const btnPlus = document.querySelector('.btn-plus');

let count = 4; // Boshlang'ich qiymat

btnPlus.addEventListener('click', () => {
    count++;
    portionValue.textContent = `${count} kishi`;
});

btnMinus.addEventListener('click', () => {
    if (count > 1) {
        count--;
        portionValue.textContent = `${count} kishi`;
    }
});

// 2. Kategoriya tugmalarini tanlash (Active holati)
const categoryButtons = document.querySelectorAll('.btn-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// 3. Masalliqlarni dinamik qo'shish va o'chirish
const btnAddIngredient = document.querySelector('.btn-add');
const ingredientList = document.querySelector('.ingredient-list');

const ingNameInput = document.querySelector('.ing-name input');
const ingQtyInput = document.querySelector('.ing-qty input');
const ingUnitSelect = document.querySelector('.ing-unit select');

btnAddIngredient.addEventListener('click', () => {
    const name = ingNameInput.value.trim();
    const qty = ingQtyInput.value.trim();
    const unit = ingUnitSelect.value;

    if (name !== "" && qty !== "") {
        // Yangi <li> elementi yaratish
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="dot"></span> ${name} 
            <span class="val">${qty}${unit === 'Gramm' ? 'g' : unit} <i class="delete-btn" style="cursor:pointer; margin-left:10px; font-style:normal;">🗑️</i></span>
        `;

        // Ro'yxatga qo'shish
        ingredientList.appendChild(li);

        // Inputlarni tozalash
        ingNameInput.value = "";
        ingQtyInput.value = "";

        // O'chirish funksiyasini biriktirish
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });
    } else {
        alert("Iltimos, masalliq nomi va miqdorini kiriting!");
    }
});

// Mavjud (default) elementlar uchun ham o'chirishni yoqish
document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.target.closest('li').remove();
    });
});
