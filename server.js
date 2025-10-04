const express = require('express');
const path = require('path');
const siteData = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { data: siteData });
});

// Rota para preview do email
app.get('/email-preview', (req, res) => {
  res.render('email-template', { data: siteData });
});

// Rota para obter HTML do email (para copiar)
app.get('/email-html', (req, res) => {
  res.render('email-template', { data: siteData }, (err, html) => {
    if (err) return res.status(500).send(err);
    res.type('text/plain').send(html);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📧 Preview do email em http://localhost:${PORT}/email-preview`);
});
