<<<<<<< HEAD

=======
let supabaseUrl = "https://wegghsekbxejorhbxxps.supabase.co"
let supabaseKey = "sb_publishable_u6cBeMNhopmWCgF-WN7i-g_AEVMwVOH"

const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

async function Bosilganda() {
  let ismValue = document.getElementById('ism').value;
  let parolValue = document.getElementById('parol').value;
  let telValue = document.getElementById('tel').value;
  let shaharValue = document.getElementById('shahar').value;

  const { data, error } = await _supabase
    .from('login_malumotlari')
    .insert([
      {
        ism: ismValue,
        parol: parseInt(parolValue), 
        telefon: parseInt(telValue), 
        shahar: shaharValue
      }
    ]);
  if (error) {
    console.error("Supabase xatosi:", error);
    alert("Xatolik yuz berdi: " + error.message);
  } else {
    console.log("Muvaffaqiyatli saqlandi:", data);
    alert("Ma'lumotlar bazaga yozildi!");

    document.getElementById('ism').value = '';
    document.getElementById('parol').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('shahar').value = '';
  }
}
>>>>>>> 58586174fdbb49262d2c9bd56ad20ae2b84e60c6
