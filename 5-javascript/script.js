const form = document.querySelector("#registration-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const fakultasSelect = document.querySelector("#fakultas-select");
const jurusanSelect = document.querySelector("#jurusan-select");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const fakultasError = document.querySelector("#fakultas-error");
const jurusanError = document.querySelector("#jurusan-error");

const dataJurusan = {
  fteic: ["Teknik Informatika", "Teknik Komputer"],
  ftk: ["Teknik Kelautan", "Teknik Transportasi Laut"],
};

function resetError() {
  nameError.textContent = "";
  emailError.textContent = "";
  fakultasError.textContent = "";
  jurusanError.textContent = "";
}

function validateForm() {
  resetError();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const fakultas = fakultasSelect.value.trim();
  const jurusan = jurusanSelect.value.trim();

  if (name === "") {
    nameError.textContent = "Nama tidak boleh kosong";
  }

  if (email === "") {
    emailError.textContent = "Email tidak boleh kosong";
  }

  if (fakultas === "") {
    fakultasError.textContent = "Fakultas tidak boleh kosong";
  }

  if (jurusan === "") {
    jurusanError.textContent = "Jurusan tidak boleh kosong";
  }

  if (!fakultas.includes(fakultasSelect.value)) {
    fakultasError.textContent = "Fakultas invalid";
  }

  if (!jurusan.includes(jurusanSelect.value)) {
    jurusanError.textContent = "Jurusan invalid";
  }

  if (name !== "" && email !== "" && fakultas !== "" && jurusan !== "") {
    window.location.href = "kodepos.html";
  }
}

window.onload = () => {
  fakultasSelect.value = "";
};

fakultasSelect.addEventListener("change", () => {
  jurusanSelect.innerHTML = "";
  const selectedFakultas = fakultasSelect.value;
  const jurusans = dataJurusan[selectedFakultas];

  jurusans.forEach((jurusan) => {
    const option = document.createElement("option");
    option.value = jurusan;
    option.textContent = jurusan;
    jurusanSelect.appendChild(option);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});
