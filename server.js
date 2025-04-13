const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serviraj statički sadržaj iz public foldera
app.use(express.static(path.join(__dirname, 'public')));

// 🔥 Serviraj style folder za CSS
app.use('/style', express.static(path.join(__dirname, 'style')));

// Sve ostalo šalje index.html (SPA podrška)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
