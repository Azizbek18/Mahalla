document.addEventListener("DOMContentLoaded", () => {
    // ====== 1. KATEGORIYA TANLASH ======
    const categoryBtns = document.querySelectorAll(".btn-category");
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            // Kichik bosish animatsiyasi
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 100);
        });
    });

    // ====== 2. PORSIYA (KISHI SONI) ======
    let count = 4;
    const minusBtn = document.querySelector(".btn-minus");
    const plusBtn = document.querySelector(".btn-plus");
    const portionText = document.querySelector(".portion-selector span");

    if (plusBtn && minusBtn) {
        plusBtn.onclick = () => {
            count++;
            updatePortion();
        };
        minusBtn.onclick = () => {
            if (count > 1) {
                count--;
                updatePortion();
            }
        };
    }

    function updatePortion() {
        portionText.textContent = count + " kishi";
        portionText.style.animation = "fadeIn 0.3s ease";
        setTimeout(() => portionText.style.animation = "", 300);
    }

    // ====== 3. MASALLIQ QO'SHISH ======
    const addIngBtn = document.querySelector(".btn-add");
    const ingList = document.querySelector(".ingredient-list");

    if (addIngBtn) {
        addIngBtn.addEventListener("click", () => {
            const nameInp = document.querySelector(".ing-name input");
            const qtyInp = document.querySelector(".ing-qty input");
            const unitSel = document.querySelector(".ing-unit select");

            const name = nameInp.value.trim();
            const qty = qtyInp.value.trim();
            let unit = unitSel.value;

            if (!name || !qty) {
                nameInp.style.border = "1px solid red";
                setTimeout(() => nameInp.style.border = "none", 1000);
                return;
            }

            if (unit.toLowerCase().includes("gramm")) unit = "g";

            const li = document.createElement("li");
            li.style.animation = "slideIn 0.4s ease forwards";
            li.innerHTML = `
                <span class="dot"></span>
                <span style="flex:1; margin-left:10px;">${name}</span>
                <span class="val">
                    ${qty}${unit} 
                    <i class="delete-icon">🗑️</i>
                </span>
            `;

            ingList.appendChild(li);

            // Tozalash
            nameInp.value = "";
            qtyInp.value = "";
        });
    }

    // ====== 4. MASALLIQNI O'CHIRISH (Delegatsiya orqali) ======
    ingList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon")) {
            const item = e.target.closest("li");
            item.style.transform = "translateX(20px)";
            item.style.opacity = "0";
            setTimeout(() => item.remove(), 300);
        }
    });

    // ====== 5. BOSQICH (QADAM) QO'SHISH ======
    const addStepBtn = document.querySelector(".qosh-btn");

    if (addStepBtn) {
        addStepBtn.addEventListener("click", () => {
            const stepSections = document.querySelectorAll(".Section-4");
            const nextStep = stepSections.length + 1;

            const newSection = document.createElement("section");
            newSection.className = "Section-4";
            newSection.style.animation = "slideIn 0.5s ease-out";

            newSection.innerHTML = `
                <div class="step-header" style="display:flex; justify-content:space-between; align-items:center;">
                    <h1 class="a1-qad">${nextStep}-QADAM</h1>
                    <span class="step-delete" style="cursor:pointer">🗑️</span>
                </div>
                <h1 class="tyyr-qdm">Tayyorlash jarayoni</h1>
                <h1 class="masaliq" contenteditable="true" style="outline:none; cursor:text;">
                    Yangi qadam tafsilotlarini kiriting...
                </h1>
            `;

            addStepBtn.before(newSection);

            // Yangi qadam uchun o'chirish funksiyasi
            newSection.querySelector(".step-delete").onclick = () => {
                newSection.style.transform = "scale(0.9)";
                newSection.style.opacity = "0";
                setTimeout(() => newSection.remove(), 300);
            };
        });
    }

    // Dastlabki bor bo'lgan qadamlar uchun o'chirish tugmasini faollashtirish
    document.querySelectorAll(".step-delete").forEach(btn => {
        btn.onclick = (e) => {
            const sec = e.target.closest(".Section-4");
            sec.style.opacity = "0";
            setTimeout(() => sec.remove(), 300);
        };
    });

    // ====== 6. RASM YUKLASH ======
    const photoBox = document.querySelector(".photo-upload");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    if (photoBox) {
        photoBox.onclick = () => fileInput.click();

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    photoBox.innerHTML = `
                        <img src="${event.target.result}" 
                             style="width:100%; height:100%; object-fit:cover; border-radius:15px; animation: fadeIn 0.5s;">
                    `;
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // ====== 7. SAQLASH VA BEKOR QILISH ======
    const saveBtn = document.querySelector(".save-btn");
    const cancelBtn = document.querySelector(".cancel-btn");

    if (saveBtn) {
        saveBtn.onclick = () => {
            const dishName = document.querySelector(".input-full").value;
            if(!dishName) return alert("Ovqat nomini kiriting!");
            
            saveBtn.innerHTML = "Saqlanmoqda...";
            setTimeout(() => {
                alert("Retsept muvaffaqiyatli saqlandi!");
                saveBtn.innerHTML = "Saqlash";
            }, 1000);
        };
    }

    if (cancelBtn) {
        cancelBtn.onclick = () => {
            if(confirm("Barcha o'zgarishlar o'chib ketadi. Rozimisiz?")) {
                location.reload();
            }
        };
    }
});