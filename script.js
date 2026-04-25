document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const inputs = document.querySelectorAll(".input");

    // 🔐 signupdan kelgan data
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    // 🧠 avtomatik chiqarish
    if (savedEmail) inputs[0].value = savedEmail;
    if (savedPassword) inputs[1].value = savedPassword;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = inputs[0].value.trim();
        const password = inputs[1].value.trim();

        if (!email || !password) {
            alert("Maydonlarni to‘ldiring!");
            return;
        }

        // 🔥 CHECK
        if (email === savedEmail && password === savedPassword) {

            alert("Kirish muvaffaqiyatli!");

            // 🚀 REDIRECT
            window.location.href = "onaretsept.html";

        } else {
            alert("Email yoki parol xato!");
        }
    });

});
function showToast(text, type = 'success', time = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type}`;
    toast.style.animationDuration = `${time}ms`; // Countdown vaqti
    toast.innerText = text;

    container.appendChild(toast);

    // Vaqt tugagach silliq yo'qotish
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, time);
}

// ISHLATISH NAMUNASI:
// showToast("Tizimga kirdingiz!", "success");
// showToast("Parol noto'g'ri!", "error", 5000);