addEventListener('page:loaded', function() {
    initCore();
});

window.document.addEventListener('offline.boxes.editorRefreshed', function (e) {
    initCore();
});

function initCore() {
    initGsap();
    initLenis();
    initImages();
    initHeadroom();
    initFancybox();
    initForm();
};

function initGsap() {
    if(typeof ScrollTrigger !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
    if(typeof SplitText !== 'undefined') { gsap.registerPlugin(SplitText); }
    if(typeof GSDevTools !== 'undefined') { gsap.registerPlugin(GSDevTools); }

    // GSDevTools.create();
}

function initLenis() {

    // Detruit l'instance precedente pour eviter d'empiler plusieurs moteurs de scroll
    if (window.scroll && typeof window.scroll.destroy === 'function') {
        window.scroll.destroy();
    }

    // Init lenis
    window.scroll = new Lenis();
    window.scroll.on('scroll', ScrollTrigger.update);

    if (!initLenis.tickerBound) {
        initLenis.tickerBound = true;
        gsap.ticker.add((time) => {
            window.scroll.raf(time * 1000); // Convert time from seconds to milliseconds
        });
    }
    gsap.ticker.lagSmoothing(0);

    // Gestion des ancres
    document.querySelectorAll('*[href*="#"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing-header-h'));
            const target = el.getAttribute('href');
            const hash = '#'+target.split('#')[1];

            if(target.charAt(0) == '#') {
                e.preventDefault();
                window.scroll.scrollTo(hash, { offset: -offset });
            } else {
                const actualPathname = window.location.pathname;
                const targetPathname = new URL(target).pathname
                if(actualPathname == targetPathname) {
                    e.preventDefault();
                    window.scroll.scrollTo(hash, { offset: -offset });
                }
            }
        });
    })
}

// Initialisation du lazyload
function initImages() {
    if (initImages.done) { return; } initImages.done = true;

    addEventListener('resize', function(e) {
        document.querySelectorAll('img[sizes]').forEach(function(el) {
            const width = el.clientWidth;
            el.sizes = width+'px';
        })
    });
}

// Gestion de l'entête sticky.
function initHeadroom(offset = 0) {
    // Detruit l'instance precedente (accrochee a l'ancien body remplace par le turbo router)
    if (initHeadroom.instance) {
        initHeadroom.instance.kill();
    }

    let el = document.body;
    setClasses(0, 0);

    initHeadroom.instance = ScrollTrigger.create({
        trigger: el,
        start: 'top+='+offset+' top',
        end: 'bottom bottom',
        onEnter: function(self) { 
            setClasses(self.progress, self.direction)
        },
        onUpdate: function(self) {
            setClasses(self.progress, self.direction);
        }
    });

    function setClasses(progress, direction) {
        switch(progress) {
            case 0:
                el.classList.remove('not-top');
                el.classList.add('top');
                break;
            case 1:
                el.classList.remove('top');
                el.classList.add('bottom');
                break;
            default:
                el.classList.remove('top');
                el.classList.add('not-top');
                break;
        }

        switch(direction) {
            case 1:
                el.classList.remove('pinned');
                el.classList.add('unpinned');
                break;
            default:
                el.classList.remove('unpinned');
                el.classList.add('pinned');
                break;
        }
    }
}

// Initialisation du fancybox
function initFancybox() {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {

        });
    }
}

// Gestion des classes sur un formulaire
function initForm() {
    if (initForm.done) { return; } initForm.done = true;

    // Champs invalides après soumission
    addEventListener('ajax:invalid-field', function(e) {
        const element = e.detail.element;
        const form = element.closest('form');
        form.querySelectorAll('[name="' + element.name + '"]').forEach(function(el) {
            el.setAttribute('aria-invalid', 'true');
        });

        const message = form.querySelector('[data-validate-for="' + element.name + '"]');
        if (message && message.dataset.validateName) {
            message.textContent = e.detail.errorMsg.join(', ').replace(new RegExp(element.name.replace(/_/g, ' '), 'i'), message.dataset.validateName);
        }
    });

    // Nettoyage des champs au moment de la validation
    addEventListener('ajax:promise', function(e) {
        e.target.querySelectorAll('[aria-invalid]').forEach(function(el) {
            el.removeAttribute('aria-invalid');
        });
    });

    // Refresh scroll trigger après chaque mise à jour ajax
    addEventListener('ajax:update-complete', function(e) {
        if(typeof ScrollTrigger !== 'undefined') { ScrollTrigger.refresh() }
    });
}