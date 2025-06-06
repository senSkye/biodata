const label = document.querySelector('.input-label');
const input = document.getElementById('data');
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.back');
const createBtn = document.querySelector('.create');
const preview = document.getElementById('preview');

let step = 1;
let formData = {
    name: '',
    address: '',
    gender: '',
    dob: '',
    contact: ''
};

function updateForm() {
    const fields = [
        { key: "name", label: "Enter your name", placeholder: "aceng" },
        { key: "address", label: "Enter your address", placeholder: "desa, kota" },
        { key: "gender", label: "Enter your gender", placeholder: "laki/banci" },
        { key: "dob", label: "Enter your DOB / TTL", placeholder: "kampung, tgl, bln, thn" },
        { key: "contact", label: "Enter your contact", placeholder: "08xxx..." }
    ];

    const current = fields[step - 1];
    if (current) {
        label.textContent = current.label;
        input.placeholder = current.placeholder;
        input.value = formData[current.key];
    }
}

// Simpan input saat berpindah step
function saveInput() {
    const keys = ["name", "address", "gender", "dob", "contact"];
    const key = keys[step - 1];
    formData[key] = input.value.trim();
}

nextBtn.addEventListener('click', () => {
    if (input.value.trim() === '') {
        input.style.outline = '2px solid red';
        return;
    }
    input.style.outline = '';
    saveInput();
    if (step < 5) step++;
    updateForm();
});

backBtn.addEventListener('click', () => {
    saveInput();
    if (step > 1) step--;
    updateForm();
});

createBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Hindari reload
    saveInput();

    const empty = Object.values(formData).some(v => v.trim() === '');
    if (empty) {
        alert("Semua kolom harus diisi.");
        input.style.outline = '2px solid red';
        return;
    }

    // Tampilkan hasil
    preview.innerHTML = `
        <h3 style="color:#07b9f9; margin-bottom: 1rem;">Preview Biodata:</h3>
        <ul style="list-style: none; padding: 1rem; font-size: 1.5em;">
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Address:</strong> ${formData.address}</li>
            <li><strong>Gender:</strong> ${formData.gender}</li>
            <li><strong>DOB:</strong> ${formData.dob}</li>
            <li><strong>Contact:</strong> ${formData.contact}</li>
        </ul>
    `;
});

updateForm(); // jalankan awal
