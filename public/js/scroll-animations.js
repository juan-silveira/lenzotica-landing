// ============================================
// SCROLL ANIMATIONS & PARALLAX
// ============================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupObservers();
        this.setupParallax();
        this.setupCounters();
    }

    // Intersection Observer para animações de scroll
    setupObservers() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');

                    // Para elementos com classe 'reveal'
                    if (entry.target.classList.contains('reveal')) {
                        entry.target.classList.add('active');
                    }

                    // Para elementos com classe 'stagger-children'
                    if (entry.target.classList.contains('stagger-children')) {
                        entry.target.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        // Observar todos os elementos com animação
        document.querySelectorAll('.scroll-animate, .reveal, .stagger-children').forEach(el => {
            observer.observe(el);
        });
    }

    // Efeito Parallax
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');

        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.pageYOffset;

            parallaxElements.forEach(el => {
                const rect = el.parentElement.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementHeight = rect.height;
                const viewportHeight = window.innerHeight;

                // Calcular se o elemento está visível
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    // Calcular posição do parallax
                    const scrollProgress = (scrollY + viewportHeight - elementTop) / (elementHeight + viewportHeight);
                    const parallaxOffset = (scrollProgress - 0.5) * 100;

                    el.style.transform = `translateY(${parallaxOffset}px)`;
                }
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        updateParallax(); // Executar na inicialização
    }

    // Animação de contagem (count-up)
    setupCounters() {
        const counterElements = document.querySelectorAll('.stat-number');

        if (counterElements.length === 0) return;

        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach(el => {
            counterObserver.observe(el.parentElement);
        });
    }

    animateCounter(element) {
        const target = element.parentElement.getAttribute('data-target');
        if (!target) return;

        element.parentElement.classList.add('counted');
        const numberElement = element;

        // Extrair número e sufixo
        const match = target.match(/^([\d.,]+)(.*)$/);
        if (!match) return;

        const targetNumber = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
        const suffix = match[2];
        const duration = 2000;
        const fps = 60;
        const increment = targetNumber / (duration / (1000 / fps));
        let currentNumber = 0;

        const timer = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }

            let displayNumber = Math.floor(currentNumber);

            // Formatar número com separador de milhares
            if (target.includes('.')) {
                displayNumber = displayNumber.toLocaleString('pt-BR');
            }

            numberElement.textContent = displayNumber + suffix;
        }, 1000 / fps);
    }

    // Smooth scroll para links âncora
    static initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animação de entrada em cards
    static animateCardsOnHover() {
        const cards = document.querySelectorAll('.hover-lift, .hover-scale');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    ScrollAnimations.initSmoothScroll();
    ScrollAnimations.animateCardsOnHover();
});

// Prevenir flash de conteúdo não-estilizado
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
