const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const siteData = require('./data');

// Criar pasta dist
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// Renderizar index.ejs para HTML
console.log('📄 Renderizando index.html...');
const templatePath = path.join(__dirname, 'views', 'index.ejs');
const html = ejs.renderFile(templatePath, { data: siteData }, (err, str) => {
  if (err) {
    console.error('❌ Erro ao renderizar template:', err);
    process.exit(1);
  }

  fs.writeFileSync(path.join(distDir, 'index.html'), str);
  console.log('✅ index.html criado!');
});

// Copiar pasta public
console.log('📁 Copiando arquivos públicos...');
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(
  path.join(__dirname, 'public'),
  path.join(distDir, 'public')
);

console.log('✅ Arquivos públicos copiados!');
console.log('');
console.log('🎉 Build concluído! Pasta dist/ está pronta para deploy.');
console.log('');
console.log('Para fazer deploy no Firebase:');
console.log('  1. firebase init hosting');
console.log('  2. Escolha "dist" como pasta pública');
console.log('  3. firebase deploy');
