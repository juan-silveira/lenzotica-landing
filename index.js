const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const siteData = require('./data');

const app = express();

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { data: siteData });
});

// Exportar para Firebase Functions
exports.app = functions.https.onRequest(app);
