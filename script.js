const form = document.getElementById('resumeForm');
const printBtn = document.getElementById('printBtn');
const resetBtn = document.getElementById('resetBtn');

printBtn.addEventListener('click', () => {
  // Tanggal dokumen diisi otomatis bila belum dipilih.
  const dateField = form.elements.namedItem('tanggal_dokumen');
  if (dateField && !dateField.value) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    dateField.value = localDate;
  }
  window.print();
});

resetBtn.addEventListener('click', () => {
  const confirmed = window.confirm('Kosongkan semua isian formulir?');
  if (!confirmed) return;
  form.reset();
});

// Saat dicetak, tinggi textarea disesuaikan agar isi tetap terlihat.
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('textarea').forEach((area) => {
    area.dataset.originalHeight = area.style.height || '';
    area.style.height = 'auto';
    area.style.height = `${area.scrollHeight}px`;
  });
});

window.addEventListener('afterprint', () => {
  document.querySelectorAll('textarea').forEach((area) => {
    area.style.height = area.dataset.originalHeight || '';
    delete area.dataset.originalHeight;
  });
});
