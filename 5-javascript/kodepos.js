const form = document.querySelector("#kodepos-form");
const provinsiSelect = document.querySelector("#provinsi-select");
const kotaSelect = document.querySelector("#kota-select");
const kecamatanSelect = document.querySelector("#kecamatan-select");
const kelurahanSelect = document.querySelector("#kelurahan-select");

const provinsiError = document.querySelector("#provinsi-error");
const kotaError = document.querySelector("#kota-error");
const kecamatanError = document.querySelector("#kecamatan-error");
const kelurahanError = document.querySelector("#kelurahan-error");

const kodeposTableBody = document.querySelector("#kodepos-table-body");

// Keep originals intact; we'll filter from these without mutating
let provinsiData = [];
let allKotaData = [];
let allKecamatanData = [];
let allKelurahanData = [];

window.addEventListener("DOMContentLoaded", () => {
  // Load all datasets
  fetch("https://kodepos.co.id/data/kelurahan.json")
    .then((response) => response.json())
    .then((data) => {
      allKelurahanData = data;
    })
    .catch(() => {});

  fetch("https://kodepos.co.id/data/provinsi.json")
    .then((response) => response.json())
    .then((data) => {
      provinsiData = data;
      addOption(provinsiSelect, provinsiData, "Pilih Provinsi");
    })
    .catch(() => {});

  fetch("https://kodepos.co.id/data/kota.json")
    .then((response) => response.json())
    .then((data) => {
      allKotaData = data;
      addOption(kotaSelect, [], "Pilih Kota/Kabupaten");
    })
    .catch(() => {});

  fetch("https://kodepos.co.id/data/kecamatan.json")
    .then((response) => response.json())
    .then((data) => {
      allKecamatanData = data;
      addOption(kecamatanSelect, [], "Pilih Kecamatan");
      addOption(kelurahanSelect, [], "Pilih Kelurahan");
    })
    .catch(() => {});
});

function addOption(selectElement, data, placeholderText) {
  selectElement.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = placeholderText || "-- Pilih --";
  placeholder.disabled = true;
  placeholder.selected = true;
  selectElement.appendChild(placeholder);

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.nama;
    option.textContent = item.nama;
    selectElement.appendChild(option);
  });
}

provinsiSelect.addEventListener("change", () => {
  const selectedProvinsi = provinsiSelect.value;
  const filteredKota = allKotaData.filter((item) => item.provinsi_nama === selectedProvinsi);
  addOption(kotaSelect, filteredKota, "Pilih Kota/Kabupaten");
  addOption(kecamatanSelect, [], "Pilih Kecamatan");
  addOption(kelurahanSelect, [], "Pilih Kelurahan");
});

kotaSelect.addEventListener("change", () => {
  const selectedKota = kotaSelect.value;
  const filteredKecamatan = allKecamatanData.filter((item) => item.kota_nama === selectedKota);
  addOption(kecamatanSelect, filteredKecamatan, "Pilih Kecamatan");
  addOption(kelurahanSelect, [], "Pilih Kelurahan");
});

kecamatanSelect.addEventListener("change", () => {
  const selectedKecamatan = kecamatanSelect.value;
  const filteredKelurahan = allKelurahanData.filter((item) => item.kecamatan_nama === selectedKecamatan);
  addOption(kelurahanSelect, filteredKelurahan, "Pilih Kelurahan");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const provinsi = provinsiSelect.value;
  const kota = kotaSelect.value;
  const kecamatan = kecamatanSelect.value;
  const kelurahan = kelurahanSelect.value;

  // Reset error messages
  provinsiError.textContent = "";
  kotaError.textContent = "";
  kecamatanError.textContent = "";
  kelurahanError.textContent = "";

  // Basic validation
  let hasError = false;
  if (!provinsi) {
    provinsiError.textContent = "Pilih provinsi";
    hasError = true;
  }
  if (!kota) {
    kotaError.textContent = "Pilih kota/kabupaten";
    hasError = true;
  }
  if (!kecamatan) {
    kecamatanError.textContent = "Pilih kecamatan";
    hasError = true;
  }
  if (!kelurahan) {
    kelurahanError.textContent = "Pilih kelurahan";
    hasError = true;
  }
  if (hasError) return;

  const kodepos = allKelurahanData.find((item) => {
    return item.nama === kelurahan && item.kecamatan_nama === kecamatan && item.kota_nama === kota && item.provinsi_nama === provinsi;
  });

  if (!kodepos) {
    alert("Data tidak ditemukan");
    return;
  }

  kodeposTableBody.innerHTML = "";
  const row = document.createElement("tr");
  row.className = "table-row";
  row.innerHTML = `
    <td>${kodepos.kode_pos}</td>
    <td>${kodepos.nama}, ${kodepos.kecamatan_nama}, ${kodepos.kota_nama}, ${kodepos.provinsi_nama}</td>
  `;
  kodeposTableBody.appendChild(row);
});
