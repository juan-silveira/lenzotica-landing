// ==========================================
// MENU MOBILE
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignorar links vazios ou apenas "#"
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Ajuste para altura do navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// MÁSCARA DE TELEFONE
// ==========================================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            if (value.length <= 10) {
                // Formato: (XX) XXXX-XXXX
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else {
                // Formato: (XX) XXXXX-XXXX
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            }
        }

        e.target.value = value;
    });
}

// ==========================================
// FORMULÁRIO DE CONTATO - WHATSAPP
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar dados do formulário
        const nome = document.getElementById('nome').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        const interesse = document.getElementById('interesse').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação básica
        if (!nome || !telefone || !interesse || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios (*)');
            return;
        }

        // Montar mensagem para WhatsApp
        let textoWhatsApp = `*🔵 Nova Solicitação - Lenzótica + Izamar*\n\n`;
        textoWhatsApp += `*Nome:* ${nome}\n`;

        if (empresa) {
            textoWhatsApp += `*Empresa:* ${empresa}\n`;
        }

        textoWhatsApp += `*Telefone:* ${telefone}\n`;

        if (email) {
            textoWhatsApp += `*E-mail:* ${email}\n`;
        }

        textoWhatsApp += `*Interesse:* ${interesse}\n\n`;
        textoWhatsApp += `*Mensagem:*\n${mensagem}`;

        // Número do WhatsApp (já configurado com o número fornecido)
        const numeroWhatsApp = '5548988187231';

        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(textoWhatsApp);

        // Criar link do WhatsApp
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        // Abrir WhatsApp em nova aba
        window.open(linkWhatsApp, '_blank');

        // Feedback visual
        const btnSubmit = contactForm.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.innerHTML;

        btnSubmit.innerHTML = `
            <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Redirecionando para WhatsApp...
        `;
        btnSubmit.disabled = true;

        // Limpar formulário após 2 segundos
        setTimeout(() => {
            contactForm.reset();
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;
        }, 2000);
    });
}

// ==========================================
// INTERSECTION OBSERVER - ANIMAÇÕES
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';

            // Para não animar novamente
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer aos elementos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.service-card, .hover-scale, section > div > div > div'
    );

    animatedElements.forEach(el => {
        // Não aplicar nos elementos do hero que já têm animação
        if (!el.closest('#inicio')) {
            el.style.opacity = '0';
            observer.observe(el);
        }
    });
});

// ==========================================
// LAZY LOADING DE IMAGENS
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                imageObserver.unobserve(img);
            }
        });
    });

    // Observar todas as imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONTADOR ANIMADO (Stats Section)
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num + '+';
}

// Observar a seção de estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.text-4xl, .text-5xl, .text-6xl');

            statNumbers.forEach((stat, index) => {
                const text = stat.textContent.trim();

                if (text === '100k+') {
                    stat.textContent = '0';
                    setTimeout(() => animateCounter(stat, 100000), index * 100);
                } else if (text === '500+') {
                    stat.textContent = '0';
                    setTimeout(() => animateCounter(stat, 500), index * 100);
                } else if (text === '8+') {
                    stat.textContent = '0';
                    setTimeout(() => animateCounter(stat, 8), index * 100);
                }
            });

            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

// Observar seção de stats
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.py-12.md\\:py-16.bg-white');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ==========================================
// PREVENÇÃO DE SCROLL HORIZONTAL
// ==========================================
document.documentElement.style.overflowX = 'hidden';
document.body.style.overflowX = 'hidden';

// ==========================================
// CAROUSEL DE PRODUTOS
// ==========================================
let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = 8;

function updateCarousel() {
    if (!carouselTrack) return;

    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Atualizar slides - remover active de todos e adicionar no atual
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            // Forçar reflow para reiniciar animação
            slide.querySelector('img').style.animation = 'none';
            setTimeout(() => {
                slide.querySelector('img').style.animation = '';
            }, 10);
        } else {
            slide.classList.remove('active');
        }
    });

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-primary');
        } else {
            indicator.classList.remove('bg-primary');
            indicator.classList.add('bg-gray-300');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Event listeners para botões
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners para indicadores
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        currentSlide = parseInt(indicator.dataset.index);
        updateCarousel();
    });
});

// Auto-play (opcional) - trocar slide a cada 5 segundos
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play quando hover no carousel
if (carouselTrack) {
    const carouselContainer = carouselTrack.parentElement.parentElement;

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Suporte para swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - próximo slide
            nextSlide();
        } else {
            // Swipe right - slide anterior
            prevSlide();
        }
    }
}

// ==========================================
// LOG DE CONSOLE (Remover em produção)
// ==========================================
console.log('%c🔵 Lenzótica + Izamar ', 'background: #1e40af; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
console.log('Site desenvolvido com Tailwind CSS');
console.log('WhatsApp: (48) 98818-7231');
