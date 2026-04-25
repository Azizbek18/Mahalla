// 1. Global o'zgaruvchilar - Barcha funksiyalar ko'rishi uchun
let activeTags = new Set();
let supabaseClient = null;

// Supabase sozlamalari (O'zingizning URL va KEY ni kiriting)
const SUPABASE_URL = 'https://xdoyebhkegroujpdxqzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TlSnezCixeZg1SAO-wCBUw_ialkE5t9';

// Supabase-ni ishga tushirish
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 2. ELEMENTLARNI TANLASH ---
    const tagWrapper = document.getElementById('tag-wrapper');
    const mainInput = document.getElementById('recipe-search');
    const suggestionTags = document.querySelectorAll('.tags span');
    const findBtn = document.getElementById('find-btn');

    // --- 3. TAG YARATISH FUNKSIYASI ---
    function createTag(tagName) {
        tagName = tagName.trim();
        // Agar tag bo'sh bo'lsa yoki allaqachon qo'shilgan bo'lsa - to'xtatish
        if (!tagName || activeTags.has(tagName)) {
            mainInput.value = "";
            return;
        }

        activeTags.add(tagName);

        // Tag elementi (HTML struktura)
        const tagDiv = document.createElement('div');
        tagDiv.className = 'input-tag';
        tagDiv.innerHTML = `
            ${tagName}
            <span class="delete-tag" data-name="${tagName}">&times;</span>
        `;

        // O'chirish hodisasi
        tagDiv.querySelector('.delete-tag').addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            activeTags.delete(name);
            tagDiv.remove();
        });

        // Inputdan oldin joylashtirish
        tagWrapper.insertBefore(tagDiv, mainInput);
        mainInput.value = ""; // Inputni tozalash
    }

    // --- 4. TADBIRLARNI (EVENTS) TINGLASH ---

    // Pastdagi tayyor masalliqlarni (span) bosganda
    suggestionTags.forEach(tagSpan => {
        tagSpan.addEventListener('click', () => {
            createTag(tagSpan.textContent);
        });
    });

    // Inputda Enter bosilganda
    mainInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Sahifa yangilanib ketmasligi uchun
            createTag(mainInput.value);
        }
        // Backspace bilan oxirgi tagni o'chirish
        if (e.key === 'Backspace' && mainInput.value === "" && activeTags.size > 0) {
            const tags = tagWrapper.querySelectorAll('.input-tag');
            const lastTag = tags[tags.length - 1];
            if (lastTag) {
                const name = lastTag.querySelector('.delete-tag').getAttribute('data-name');
                activeTags.delete(name);
                lastTag.remove();
            }
        }
    });

    // Topish tugmasi
    if (findBtn) {
        findBtn.addEventListener('click', searchFromSupabase);
    }
});

// --- 5. SUPABASE QIDIRUV FUNKSIYASI ---
async function searchFromSupabase() {
    if (!supabaseClient) {
        alert("Supabase ulanmagan! URL va KEY ni tekshiring.");
        return;
    }

    const ingredientsToSearch = Array.from(activeTags).map(t => t.toLowerCase());

    if (ingredientsToSearch.length === 0) {
        alert("Iltimos, kamida bitta masalliq tanlang yoki yozing!");
        return;
    }

    // Vizual kutish holati
    const recipeGrid = document.getElementById('recipes-grid');
    if (recipeGrid) recipeGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">Qidirilmoqda...</p>';

    try {
        // Supabase so'rovi
        const { data, error } = await supabaseClient
            .from('recipes')
            .select('*')
            .contains('ingredients', ingredientsToSearch);

        if (error) throw error;

        renderUI(data);
    } catch (err) {
        console.error("Xatolik:", err.message);
        alert("Ma'lumot olishda xatolik yuz berdi.");
    }
}

// --- 6. NATIJALARNI EKRANGA CHIQARISH ---
function renderUI(results) {
    const recipeGrid = document.getElementById('recipes-grid');
    const liCon = document.querySelector('.li-con');
    const aCon = document.querySelector('.a-con');

    // 1. Asosiy kartochkalarni yangilash
    if (recipeGrid) {
        recipeGrid.innerHTML = '';
        if (results.length === 0) {
            recipeGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">Mos taom topilmadi.</p>';
        } else {
            results.forEach((recipe, i) => {
                recipeGrid.innerHTML += `
                    <div class="card show" style="animation-delay: ${i * 0.1}s">
                        <img src="${recipe.image_url || 'Images/osh.png'}" alt="${recipe.name}">
                        <div class="card-content">
                            <h4>${recipe.name}</h4>
                            <p>👤 ${recipe.author || 'OnaRetsept'}, ${recipe.category}</p>
                            <div class="card-footer">
                                <span>⏱ ${recipe.time}</span>
                                <button class="view-recipe">→</button>
                            </div>
                        </div>
                    </div>`;
            });
        }
    }

    // 2. Yuqoridagi "Sizga mos" ro'yxatni yangilash
    if (liCon && aCon) {
        liCon.innerHTML = '';
        aCon.innerHTML = '';
        results.slice(0, 3).forEach((recipe, i) => {
            const percent = [98, 88, 82][i] || 75;
            const cls = i === 0 ? 'Green' : 'orange';
            liCon.innerHTML += `<li class="${cls}">• ${recipe.name} <span>${percent}%</span></li>`;
            aCon.innerHTML += `<a class="end" href="#">Ko'rish →</a>`;
        });
    }
}