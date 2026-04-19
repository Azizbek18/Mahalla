document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const loginBtn = document.querySelector("button");
    const inputs = document.querySelectorAll(".input");

    // 🔔 Toast elementlari
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    const toastTimer = document.getElementById("toast-timer");

    // 🔔 Toast funksiyasi
    function showToast(message, type = "success", duration = 3000) {
        toast.className = "toast show " + type;
        toastMsg.textContent = message;

        toastTimer.innerHTML = `<div style="height:100%;background:#8D4B00;animation:countdown ${duration}ms linear;"></div>`;

        setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }

    // 🔐 To'g'ri login ma'lumotlari
    const correctEmail = "example@gmail.com";
    const correctPassword = "04040202";

    // 1. Form submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = inputs[0];
        const passwordInput = inputs[1];

        let hasError = false;

        // Bo'sh tekshirish
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                hasError = true;
                input.classList.add("input-error");
                setTimeout(() => input.classList.remove("input-error"), 400);
            }
        });

        if (hasError) {
            showToast("Maydonlarni to‘ldiring!", "error");
            return;
        }

        // Email format tekshirish
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add("input-error");
            showToast("Email noto‘g‘ri formatda!", "error");
            return;
        }

        // Login tekshirish
        if (
            emailInput.value !== correctEmail ||
            passwordInput.value !== correctPassword
        ) {
            emailInput.classList.add("input-error");
            passwordInput.classList.add("input-error");

            showToast("Email yoki parol xato!", "error");
            return;
        }

        // ✅ SUCCESS
        loginBtn.disabled = true;
        loginBtn.innerHTML = "Kirilmoqda...";
        loginBtn.style.opacity = "0.7";

        setTimeout(() => {
            showToast("Muvaffaqiyatli amalga oshirildi!", "success");

            // 🔥 BU YERDA redirect qo‘shildi
            setTimeout(() => {
                window.location.href = "onaretsept.html";
            }, 1500);

        }, 1500);
    });

    // 2. Input yozilganda xatoni olib tashlash
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("input-error");
        });
    });

    // 3. Icon animatsiya
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