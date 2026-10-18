const puppeteer = require('D:/Work/WED/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const logoSvg = fs.readFileSync('D:/Work/pajama-avatar/public/rmh_ukraine_logo_hrz_black.svg', 'utf8');
  const shopperBase64 = fs.readFileSync('D:/Work/pajama-avatar/public/merch/shopper.png').toString('base64');
  const socksBase64 = fs.readFileSync('D:/Work/pajama-avatar/public/merch/socks.png').toString('base64');
  const cupBase64 = fs.readFileSync('D:/Work/pajama-avatar/public/merch/cup.png').toString('base64');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1200px;
        height: 630px;
        background-color: #FAF6EB;
        font-family: 'Plus Jakarta Sans', sans-serif;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 60px 42px 60px;
      }
      .bg-glow-1 {
        position: absolute;
        top: -80px;
        right: -60px;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(254, 205, 211, 0.45) 0%, rgba(254, 240, 138, 0.3) 50%, transparent 70%);
        border-radius: 50%;
        filter: blur(50px);
        z-index: 1;
      }
      .bg-glow-2 {
        position: absolute;
        bottom: -100px;
        left: -80px;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(254, 240, 138, 0.5) 0%, rgba(254, 205, 211, 0.25) 50%, transparent 70%);
        border-radius: 50%;
        filter: blur(60px);
        z-index: 1;
      }
      .header {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo-box {
        height: 54px;
        display: flex;
        align-items: center;
      }
      .logo-box svg {
        height: 52px;
        width: auto;
      }
      .date-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 18px;
        background: #FEE2E2;
        border: 1.5px solid #FCA5A5;
        border-radius: 9999px;
        color: #E31837;
        font-size: 13.5px;
        font-weight: 900;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .content {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        margin-top: 4px;
      }
      .copy-col {
        max-width: 660px;
      }
      .title {
        font-size: 44px;
        line-height: 1.14;
        font-weight: 900;
        color: #0F172A;
        letter-spacing: -0.025em;
        margin-bottom: 16px;
      }
      .title-red {
        color: #E31837;
      }
      .desc {
        font-size: 18px;
        line-height: 1.45;
        color: #475569;
        font-weight: 500;
        margin-bottom: 22px;
      }
      .badges-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(217, 119, 6, 0.25);
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        color: #1E293B;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      .visual-col {
        position: relative;
        width: 380px;
        height: 290px;
        background: white;
        border-radius: 32px;
        border: 4px solid #FFFFFF;
        box-shadow: 0 20px 40px rgba(180, 83, 9, 0.12), 0 4px 12px rgba(0,0,0,0.04);
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .visual-box {
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FEF3C7 0%, #FFE4E6 50%, #F3E8FF 100%);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .item-sock {
        position: absolute;
        height: 215px;
        left: 20px;
        bottom: 12px;
        filter: drop-shadow(0 12px 18px rgba(0,0,0,0.18));
        transform: rotate(-10deg);
        z-index: 2;
      }
      .item-shopper {
        position: absolute;
        height: 190px;
        right: 15px;
        bottom: 20px;
        filter: drop-shadow(0 12px 18px rgba(0,0,0,0.18));
        transform: rotate(8deg);
        z-index: 1;
      }
      .item-cup {
        position: absolute;
        height: 115px;
        top: 20px;
        left: 120px;
        filter: drop-shadow(0 10px 14px rgba(0,0,0,0.15));
        z-index: 3;
      }
      .tag-bubble {
        position: absolute;
        top: 14px;
        right: 14px;
        background: rgba(255,255,255,0.95);
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 900;
        color: #0F172A;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        z-index: 10;
      }
      .footer-note {
        position: relative;
        z-index: 10;
        font-size: 13.5px;
        font-weight: 700;
        color: #94A3B8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 14px;
        border-top: 1px solid rgba(217, 119, 6, 0.15);
      }
    </style>
  </head>
  <body>
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="header">
      <div class="logo-box">
        ${logoSvg}
      </div>
      <div class="date-badge">
        <span>🗓️</span>
        <span>13 листопада — Всеукраїнський День Піжам</span>
      </div>
    </div>

    <div class="content">
      <div class="copy-col">
        <h1 class="title">
          Одягаємо піжаму <span class="title-red">не для сну</span>, а для підтримки!
        </h1>
        <p class="desc">
          Коли діти хворіють, піжама стає для них частинкою дому в лікарні. Долучайся: створи онлайн-піжаму, замовляй благодійний мерч та допоможи збудувати перший Дім Рональда МакДональда в Україні!
        </p>
        <div class="badges-row">
          <div class="pill">✨ Онлайн-піжама</div>
          <div class="pill">🛍️ Благодійний мерч-шоп</div>
          <div class="pill">🎁 Розіграш за донат від 50 ₴</div>
        </div>
      </div>

      <div class="visual-col">
        <div class="visual-box">
          <div class="tag-bubble">#ДеньПіжам 💛</div>
          <img class="item-sock" src="data:image/png;base64,${socksBase64}" />
          <img class="item-shopper" src="data:image/png;base64,${shopperBase64}" />
          <img class="item-cup" src="data:image/png;base64,${cupBase64}" />
        </div>
      </div>
    </div>

    <div class="footer-note">
      <span>Фундація «Дім Рональда МакДональда в Україні»</span>
      <span>pajama-avatar.vercel.app</span>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'D:/Work/pajama-avatar/public/og-image.png',
    type: 'png'
  });

  console.log('og-image.png generated successfully');
  await browser.close();
})();
