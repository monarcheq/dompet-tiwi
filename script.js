// Data autentikasi Telegram Bot
const BOT_TOKEN = '8989416266:AAFHSx6SRdQB9eXfTYDyCd5dabwjNcYOAE8';
const CHAT_ID = '8427116832';

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const statusDiv = document.getElementById('status');
  
  const file = fileInput.files[0];
  if (!file) {
    statusDiv.textContent = 'Pilih file terlebih dahulu!';
    statusDiv.style.color = 'red';
    return;
  }

  // Menyiapkan data formulir untuk dikirim ke API Telegram
  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('document', file);

  statusDiv.textContent = 'Mengirim file...';
  statusDiv.style.color = '#333';

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.ok) {
      statusDiv.textContent = 'Berhasil dikirim ke Telegram!';
      statusDiv.style.color = 'green';
      fileInput.value = ''; // Kosongkan input file
    } else {
      statusDiv.textContent = `Gagal: ${result.description}`;
      statusDiv.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
    statusDiv.textContent = 'Terjadi kesalahan jaringan.';
    statusDiv.style.color = 'red';
  }
});
