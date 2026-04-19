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