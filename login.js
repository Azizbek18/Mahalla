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

        // 🔴 VALIDATION
        if (!ism || !email || !parol || !tasdiq) {
            alert("Barcha maydonlarni to‘ldiring!");
            return;
        }

        if (parol !== tasdiq) {
            alert("Parollar mos emas!");
            return;
        }

        if (parol.length < 6) {
            alert("Parol kamida 6 ta belgi bo‘lsin!");
            return;
        }

        // 🔥 SUPABASE INSERT
        const { data, error } = await _supabase
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
            console.error(error);
            alert("Xatolik: " + error.message);
            return;
        }

        alert("Ro‘yxatdan o‘tildi!");

        // 🔐 LOGIN UCHUN SAQLASH
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", parol);

        window.location.href = "index.html";

    } catch (err) {
        console.error(err);
        alert("Internet yoki Supabase muammosi!");
    }
}