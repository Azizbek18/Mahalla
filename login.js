const supabaseUrl = "https://xdoyebhkegroujpdxqzs.supabase.co";
const supabaseKey = "sb_publishable_TlSnezCixeZg1SAO-wCBUw_ialkE5t9";

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function Bosilganda() {
  try {
    const ism = document.getElementById('ism').value.trim();
    const email = document.getElementById('email').value.trim();
    const parol = document.getElementById('parol').value.trim();
    const tasdiq = document.getElementById('tasdiq').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const shahar = document.getElementById('shahar').value.trim();

    if (!ism || !email || !parol || !tasdiq) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    if (parol !== tasdiq) {
      alert("Parollar mos emas!");
      return;
    }

    // 🔥 SUPABASEGA YOZISH
    const { error } = await _supabase
      .from('OnaRetsept')
      .insert([
        {
          ism: ism,
          email: email,
          parol: parol,
          telefon: tel,
          shahar: shahar
        }
      ]);

    if (error) {
      alert("Xatolik: " + error.message);
      return;
    }

    // 🔥 TOAST FUNKSIYA
    function showToast(message, type = "success") {
      const toast = document.getElementById("toast");
      const text = document.getElementById("toastText");

      toast.className = "toast show " + type;
      text.innerText = message;

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }

    // 🔐 LOCAL STORAGE (LOGIN UCHUN)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", parol);

    alert("Muvaffaqiyatli ro‘yxatdan o‘tdingiz!");

    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    alert("Xatolik yuz berdi!");
  }
}