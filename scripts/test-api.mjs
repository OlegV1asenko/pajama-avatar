const https = require('https');

const body = JSON.stringify({ gender: 'person', pajamaColor: 'light blue' });

const options = {
  hostname: 'pajama-avatar.vercel.app',
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log('Testing POST /api/generate...');
const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error('API Error:', json.error);
        if (json.retryable) console.log('Retryable: yes');
      } else if (json.imageBase64) {
        console.log('SUCCESS! Image generated, base64 length:', json.imageBase64.length);
        console.log('MIME type:', json.mimeType);
      } else {
        console.log('Unexpected response:', JSON.stringify(json).slice(0, 300));
      }
    } catch {
      console.log('Raw response (first 500 chars):', data.slice(0, 500));
    }
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.setTimeout(90000, () => { console.error('TIMEOUT after 90s'); req.destroy(); });
req.write(body);
req.end();
