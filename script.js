document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const loginBtn = document.querySelector("button");
    const inputs = document.querySelectorAll(".input");

    // 1. Kirish tugmasi bosilganda
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Sahifa yangilanib ketishini to'xtatamiz
        
        let hasError = false;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                hasError = true;
                // Xatolik animatsiyasi
                input.classList.add("input-error");
                // Animatsiya tugagach klassni olib tashlaymiz
                setTimeout(() => input.classList.remove("input-error"), 400);
            }
        });

        if (!hasError) {
            // Tugmani yuklanish holatiga keltirish
            loginBtn.disabled = true;
            loginBtn.innerHTML = "Kirilmoqda...";
            loginBtn.style.opacity = "0.7";

            // "Muvaffaqiyatli" imitatsiyasi
            setTimeout(() => {
                alert("Xush kelibsiz! Retseptlar dunyosi sizni kutmoqda.");
                // Bu yerda sahifaga yo'naltirish mumkin:
                // window.location.href = "asosiy_sahifa.html";
                loginBtn.disabled = false;
                loginBtn.innerHTML = "Kirish";
                loginBtn.style.opacity = "1";
            }, 1500);
        }
    });

    // 2. Inputga yozishni boshlaganda xatolik rangini yo'qotish
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("input-error");
        });
    });

    // 3. Kichik interaktivlik: Inputga focus bo'lganda icon pulsatsiyasi
    const icon = document.querySelector(".background img");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            icon.parentElement.style.transform = "scale(1.1)";
            icon.parentElement.style.transition = "0.3s";
        });
        input.addEventListener("blur", () => {
            icon.parentElement.style.transform = "scale(1)";
        });
    });
});