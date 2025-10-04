const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Dados da aplicação
const siteData = {
  empresa: 'Lenzótica',
  telefone: '(48) 98818-7231',
  whatsapp: '5548988187231',
  endereco: 'Rua Vereador Arthur Manoel Mariano, 362, Sala 02, Forquilhinhas, São José - SC',
  horario: 'Segunda a Sexta: 9h às 18h30 | Sábado: 9h às 13h',
  instagram: '@lenzoticaoficial',
  facebook: 'https://www.facebook.com/share/15Zp5rL5AT/',

  stats: [
    { numero: '100k+', label: 'Óculos Vendidos' },
    { numero: '500+', label: 'Empresas Atendidas' },
    { numero: '8+', label: 'Grandes Clientes' },
    { numero: 'SC', label: 'Nova Expansão' }
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
    { nome: 'Usiminas', logo: '', url: 'https://www.usiminas.com.br' },
    { nome: 'GE', logo: '', url: 'https://www.ge.com' },
    { nome: 'Alstom', logo: '', url: 'https://www.alstom.com' },
    { nome: 'ArcelorMittal', logo: '', url: 'https://www.arcelormittal.com' },
    { nome: 'Goodyear', logo: '', url: 'https://www.goodyear.com' },
    { nome: 'ZF do Brasil', logo: '', url: 'https://www.zf.com.br' },
    // { nome: 'Liceu', logo: 'public/images/clients/liceu.png', url: 'https://www.liceu.com.br' },
    { nome: 'Univar', logo: '', url: 'https://www.univar.com' },
    { nome: 'Thyssenkrupp', logo: '', url: 'https://www.thyssenkrupp.com' },
    { nome: 'Anauger', logo: '', url: 'https://www.anauger.com' },
    { nome: 'Recicle', logo: '', url: '' }
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

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { data: siteData });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
