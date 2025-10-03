const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Dados do site (mesmo do index.js)
const siteData = {
  empresa: 'Lenzótica + Izamar',
  telefone: '(48) 98818-7231',
  whatsapp: '5548988187231',
  endereco: 'Rua Vereador Arthur Manoel Mariano, 362, Sala 02, Forquilhinhas, São José - SC',
  horario: 'Segunda a Sexta: 9h às 18h30 | Sábado: 9h às 13h',
  instagram: '@lenzoticaoficial',
  facebook: 'https://www.facebook.com/share/15Zp5rL5AT/',

  stats: [
    { numero: '15+', label: 'Anos de Experiência' },
    { numero: '50+', label: 'Empresas Atendidas' },
    { numero: '10.000+', label: 'Clientes Satisfeitos' },
    { numero: '100%', label: 'Qualidade Garantida' }
  ],

  produtos: [
    {
      imagem: 'public/images/products/1.jpeg',
      titulo: 'Óculos de Proteção EPI',
      descricao: 'Máxima proteção para ambientes industriais com tecnologia anti-embaçante e proteção UV.'
    },
    {
      imagem: 'public/images/products/2.jpeg',
      titulo: 'Óculos de Grau',
      descricao: 'Armações modernas e lentes de alta qualidade para o seu dia a dia.'
    },
    {
      imagem: 'public/images/products/3.jpeg',
      titulo: 'Óculos de Sol',
      descricao: 'Proteção UV400 com estilo e conforto para todas as ocasiões.'
    },
    {
      imagem: 'public/images/products/4.jpeg',
      titulo: 'Lentes Especiais',
      descricao: 'Lentes antirreflexo, fotossensíveis e com filtro de luz azul.'
    },
    {
      imagem: 'public/images/products/5.jpeg',
      titulo: 'Equipamentos de Segurança',
      descricao: 'EPIs certificados para proteção visual em ambientes industriais.'
    },
    {
      imagem: 'public/images/products/6.jpeg',
      titulo: 'Armações Premium',
      descricao: 'Coleção exclusiva de armações de marcas renomadas.'
    },
    {
      imagem: 'public/images/products/7.jpeg',
      titulo: 'Óculos Esportivos',
      descricao: 'Desenvolvidos para alta performance em atividades físicas.'
    },
    {
      imagem: 'public/images/products/8.jpeg',
      titulo: 'Acessórios',
      descricao: 'Estojos, cordões, lenços e produtos de limpeza especializados.'
    }
  ],

  clientes: [
    { nome: 'WEG', logo: 'public/images/clients/weg.png', url: 'https://www.weg.net' },
    { nome: 'Tupy', logo: 'public/images/clients/tupy.png', url: 'https://www.tupy.com.br' },
    { nome: 'Embraco', logo: 'public/images/clients/embraco.png', url: 'https://www.embraco.com' },
    { nome: 'Whirlpool', logo: 'public/images/clients/whirlpool.png', url: 'https://www.whirlpool.com.br' },
    { nome: 'Tigre', logo: 'public/images/clients/tigre.png', url: 'https://www.tigre.com.br' },
    { nome: 'Hering', logo: 'public/images/clients/hering.png', url: 'https://www.hering.com.br' },
    { nome: 'Gerdau', logo: 'public/images/clients/gerdau.png', url: 'https://www.gerdau.com.br' },
    { nome: 'Havai Brasil', logo: 'public/images/clients/havaibrasil.png', url: 'https://www.havaibrasil.com.br' },
    { nome: 'Vonpar', logo: 'public/images/clients/vonpar.png', url: 'https://www.vonpar.com.br' },
    { nome: 'Celesc', logo: 'public/images/clients/celesc.png', url: 'https://www.celesc.com.br' },
    { nome: 'Eletrosul', logo: 'public/images/clients/eletrosul.png', url: 'https://www.eletrosul.gov.br' },
    { nome: 'SC Gás', logo: 'public/images/clients/scgas.png', url: 'https://www.scgas.com.br' }
  ],

  sobre: [
    {
      icone: '👓',
      titulo: 'Especialistas em Óptica',
      descricao: 'Mais de 15 anos de experiência no mercado de óculos e EPIs, oferecendo sempre o melhor para nossos clientes.',
      imagem: 'public/images/bg/1.jpeg'
    },
    {
      icone: '🏭',
      titulo: 'Atendimento Empresarial',
      descricao: 'Soluções completas para empresas, incluindo EPIs certificados e programas de saúde visual corporativa.',
      imagem: 'public/images/bg/2.jpeg'
    },
    {
      icone: '🔬',
      titulo: 'Tecnologia Avançada',
      descricao: 'Equipamentos de última geração para exames optométricos precisos e atendimento de qualidade.',
      imagem: 'public/images/bg/3.jpeg'
    }
  ],

  diferenciais: [
    {
      titulo: 'Economia para sua Empresa',
      descricao: 'Descontos especiais em compras corporativas e planos personalizados para sua empresa.',
      icone: '💰'
    },
    {
      titulo: 'Atendimento no Local',
      descricao: 'Levamos nossos serviços até sua empresa, facilitando o acesso dos colaboradores.',
      icone: '🚗'
    },
    {
      titulo: 'Certificação e Qualidade',
      descricao: 'Todos os nossos produtos possuem certificação e garantia de qualidade.',
      icone: '✅'
    },
    {
      titulo: 'Parcelamento Facilitado',
      descricao: 'Condições especiais de pagamento para empresas e colaboradores.',
      icone: '💳'
    }
  ]
};

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
