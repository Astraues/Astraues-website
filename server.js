const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const time = new Date().toISOString();
  const log = `[${time}] IP: ${ip} → ${req.url}\n`;
  fs.appendFileSync('visitors.log', log);
  console.log(log.trim());
  next();
});

app.use(express.static(path.join(__dirname)));

app.listen(3000, () => {
  console.log('Astraeus server running on http://localhost:3000');
});