// ====== KATEGORIYA (toggle active) ======
document.querySelectorAll(".btn-category").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".btn-category")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


// ====== PORSIYA ======
let count = 4;
const minus = document.querySelector(".btn-minus");
const plus = document.querySelector(".btn-plus");
const portionText = document.querySelector(".portion-selector span");

function renderPortion() {
  portionText.textContent = count + " kishi";
}

plus.onclick = () => {
  count++;
  renderPortion();
};

minus.onclick = () => {
  if (count > 1) count--;
  renderPortion();
};


// ====== INGREDIENT DELETE (universal) ======
const list = document.querySelector(".ingredient-list");

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    e.target.closest("li").remove();
  }
});


// ====== INGREDIENT ADD ======
document.querySelector(".btn-add").addEventListener("click", () => {
  const nameEl = document.querySelector(".ing-name input");
  const qtyEl = document.querySelector(".ing-qty input");
  const unitEl = document.querySelector(".ing-unit select");

  let name = nameEl.value.trim();
  let qty = qtyEl.value.trim();
  let unit = unitEl.value;

  if (!name || !qty) return;

  // format (rasmga mos)
  if (unit.toLowerCase().includes("gram")) unit = "g";

  const li = document.createElement("li");

  li.innerHTML = `
    <span class="dot"></span>
    ${name}
    <span class="val">
      ${qty}${unit}
      <i class="delete-icon">🗑️</i>
    </span>
  `;

  list.appendChild(li);

  nameEl.value = "";
  qtyEl.value = "";
});


// ====== STEP (1:1 UIga yaqin) ======
const stepBtn = document.querySelector(".qosh-btn");

stepBtn.addEventListener("click", () => {
  const stepCount = document.querySelectorAll(".Section-4").length + 1;

  const wrapper = document.createElement("section");
  wrapper.className = "Section-4";

  wrapper.innerHTML = `
    <h1 class="a1-qad">${stepCount}-qadam</h1>
    <div class="tayorlash-retsept">
      <h1 class="tyyr-qdm">Tayyor qadam</h1>
      <h1 class="masaliq" contenteditable="true">
        Yangi qadam yozing...
      </h1>
    </div>
  `;

  stepBtn.before(wrapper);
});


// ====== STEP DELETE ICON QO‘SHISH ======
function addDeleteToSteps() {
  document.querySelectorAll(".Section-4").forEach(sec => {
    if (!sec.querySelector(".step-delete")) {
      const del = document.createElement("span");
      del.className = "step-delete";
      del.textContent = "🗑️";

      del.onclick = () => sec.remove();

      sec.querySelector(".a1-qad").appendChild(del);
    }
  });
}

// sahifa yuklanganda ham ishlasin
addDeleteToSteps();

// yangi step qo‘shilganda ham ishlasin
document.querySelector(".qosh-btn").addEventListener("click", () => {
  setTimeout(addDeleteToSteps, 0);
});


// ====== BEKOR QILISH ======
document.querySelector(".cancel-btn").addEventListener("click", () => {
  if (confirm("Haqiqatan ham bekor qilmoqchimisiz?")) {
    location.reload();
  }
});


// ====== SAQLASH ======
document.querySelector(".save-btn").addEventListener("click", () => {
  const title = document.querySelector("input[type='text']").value;

  const ingredients = [];
  document.querySelectorAll(".ingredient-list li").forEach(li => {
    ingredients.push(li.innerText);
  });

  const steps = [];
  document.querySelectorAll(".masaliq").forEach(s => {
    steps.push(s.innerText);
  });

  const data = {
    title,
    ingredients,
    steps
  };

  console.log("SAQLANDI:", data);
  alert("Retsept saqlandi (console ga qarang)");
});

// ====== FOTO UPLOAD (fake preview) ======
const uploadBox = document.querySelector(".photo-upload");

const inputFile = document.createElement("input");
inputFile.type = "file";
inputFile.accept = "image/*";
inputFile.style.display = "none";

uploadBox.appendChild(inputFile);

uploadBox.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadBox.innerHTML = `
      <img src="${e.target.result}" 
           style="max-width:100%; border-radius:10px;" />
    `;
  };
  reader.readAsDataURL(file);
});