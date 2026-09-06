const mineflayer = require('mineflayer');
const express = require('express');

const HOST = 'benbenimya.aternos.me';
const PORT = 50980;
const USERNAME = 'piyikli_bot';

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false // otomatik sürüm algılama
  });

  bot.on('spawn', () => {
    console.log('Sunucuya bağlandı!');
    // Rastgele hareket ederek AFK görünmesini engelle
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bağlantı koptu, 10 saniye sonra tekrar denenecek...');
    setTimeout(createBot, 10000);
  });

  bot.on('kicked', (reason) => console.log('Kicklendi:', reason));
  bot.on('error', (err) => console.log('Hata:', err));
}

createBot();

// Render'ın "web service" olarak görmesi için basit bir HTTP sunucu
const app = express();
app.get('/', (req, res) => res.send('Bot çalışıyor'));
app.listen(process.env.PORT || 3000);
