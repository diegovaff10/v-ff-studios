document.addEventListener('DOMContentLoaded', () => {

    // --- MANEJO DEL HEADER Y MENÚ MÓVIL ---
    const header = document.querySelector('.main-header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if(mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isNavActive = document.documentElement.classList.toggle('nav-active');
            mobileNavToggle.setAttribute('aria-expanded', isNavActive);
            mobileNavMenu.setAttribute('aria-hidden', !isNavActive);
        });
    }

    if(mobileNavMenu) {
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                document.documentElement.classList.remove('nav-active');
                if (mobileNavToggle) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
                mobileNavMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // --- LÓGICA PARA MARCAR LINK ACTIVO EN SCROLL (SOLO EN INDEX) ---
    const allNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
    if (document.querySelector('#servicios')) {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = { rootMargin: "-50% 0px -50% 0px" };
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    allNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.hash === `#${id}`) { 
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        sections.forEach(section => sectionObserver.observe(section));
    }
    
    // --- LÓGICA PARA ANIMACIONES DE SCROLL ---
    const scrollAnimationsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(element => scrollAnimationsObserver.observe(element));

    // --- LÓGICA PARA EL BOTÓN "VOLVER ARRIBA" ---
    const backToTopButton = document.querySelector('#back-to-top-btn');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- LÓGICA DEL INTERRUPTOR DE TEMA ---
    const themeToggleButton = document.querySelector('#theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.documentElement.classList.toggle('light-theme');
            const theme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }
    
    // --- LÓGICA DE TRANSICIÓN DE PÁGINA ---
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
            link.addEventListener('click', function(e) {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location = this.href;
                }, 400);
            });
        }
    });

});